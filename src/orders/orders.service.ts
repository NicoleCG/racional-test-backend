import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { PortfolioStock } from 'src/portfolios/entities/portfolioStock.entity';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { Stock } from './entities/stocks.entity';
import { TypeOrder } from './enum/typeOrder.enum';
import { OrderMapper } from './mappers/order.mappers';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(req, createOrderDto: CreateOrderDto): Promise<GetOrderDto> {
    const userId = req.user.userId;

    // Add datetime to Dto
    createOrderDto.date = new Date();

    // Create order according type
    const orderCreated = await this.dataSource.transaction(async (manager) => {
      // Check if exist stock
      const stock = await manager.findOne(Stock, {
        where: { ticker: createOrderDto.stockTicker },
      });
      if (!stock) {
        throw new NotFoundException('Stock no encontrado');
      }

      // Find user's portfolio and portfolio-stock
      const portfolio = await manager.findOne(Portfolio, {
        where: { user: { id: userId } },
        relations: ['user'],
        lock: { mode: 'pessimistic_write' },
      });

      if (!portfolio) {
        throw new NotFoundException('Portfolio no encontrado');
      }

      const portfolioStock: PortfolioStock = await manager.findOne(
        PortfolioStock,
        {
          where: {
            portfolio: { id: portfolio.id },
            stock: { ticker: createOrderDto.stockTicker },
          },
          relations: ['stock'],
          lock: { mode: 'pessimistic_write' },
        },
      );

      if (createOrderDto.type == TypeOrder.SELL) {
        await this.createSell(
          createOrderDto,
          portfolio,
          portfolioStock,
          manager,
        );
      } else {
        await this.createBuy(
          stock,
          createOrderDto,
          portfolio,
          portfolioStock,
          manager,
        );
      }

      const order: Order = manager.create(Order, {
        ...createOrderDto,
        portfolio: { id: portfolio.id },
        user: { id: userId },
        stock,
      });

      return await manager.save(order);
    });

    return OrderMapper.entityToDto(orderCreated);
  }

  async createSell(
    createOrderDto: CreateOrderDto,
    portfolio: Portfolio,
    portfolioStock: PortfolioStock,
    manager,
  ) {
    // Validate amount and existence of stocks
    if (!portfolioStock) {
      throw new NotFoundException(
        `El usuario no tiene acciones de ${createOrderDto.stockTicker}`,
      );
    }
    if (portfolioStock.amount < createOrderDto.amount) {
      throw new NotFoundException(
        `El usuario no tiene suficientes acciones ${createOrderDto.stockTicker} para vender`,
      );
    }

    // Update PortfolioStock
    portfolioStock.amount -= createOrderDto.amount;

    if (portfolioStock.amount == 0) {
      await manager.remove(portfolioStock);
    } else {
      await manager.save(portfolioStock);
    }

    // Update user's balance in Portfolio
    portfolio.balance += createOrderDto.price * createOrderDto.amount;
    await manager.save(portfolio);
  }

  async createBuy(
    stock,
    createOrderDto: CreateOrderDto,
    portfolio: Portfolio,
    portfolioStock: PortfolioStock,
    manager,
  ) {
    const totalCost = createOrderDto.amount * createOrderDto.price;

    // Check if the user has sufficient balance
    if (portfolio.balance < totalCost) {
      throw new BadRequestException('Saldo insuficiente');
    }

    // In case portfolioStock doesn't exist create a new one
    if (!portfolioStock) {
      const newPortfolioStock = manager.create(PortfolioStock, {
        amount: createOrderDto.amount,
        portfolio: { id: portfolio.id },
        stock: stock,
        avgPurchasePrice: createOrderDto.price,
      });
      manager.save(newPortfolioStock);
    } else {
      // In case already exists
      const totalAmount = portfolioStock.amount + createOrderDto.amount;
      const newAvgPrice =
        (portfolioStock.amount * portfolioStock.avgPurchasePrice + totalCost) /
        totalAmount;

      portfolioStock.amount = totalAmount;
      portfolioStock.avgPurchasePrice = newAvgPrice;

      await manager.save(portfolioStock);
    }

    // Update user's balance
    portfolio.balance -= totalCost;
    await manager.save(portfolio);
  }
}
