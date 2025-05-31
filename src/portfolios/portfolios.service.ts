import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioMapper } from './mappers/portfolio.mapper';
import { GetPortfolioDto } from './dto/get-portfolio.dto';
import { PortfolioStock } from './entities/portfolioStock.entity';
import { GetPortfolioValueDto } from './dto/get-portfolio-value.dto';
import { Order } from 'src/orders/entities/order.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,

    @InjectRepository(PortfolioStock)
    private readonly portfolioStockRepository: Repository<PortfolioStock>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async update(
    req,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<GetPortfolioDto> {
    const userId = req.user.userId;
    const portfolio = await this.getPortfolio(userId);

    // Modify portfolio information
    const portfolioPreLoad = await this.portfolioRepository.preload({
      id: portfolio.id,
      ...updatePortfolioDto,
    });
    const portfolioModified =
      await this.portfolioRepository.save(portfolioPreLoad);
    return PortfolioMapper.entityToDto(portfolioModified);
  }

  async getBalance(req): Promise<GetPortfolioValueDto> {
    const userId = req.user.userId;

    // Find user's portfolio and portfolio-stock
    const portfolio = await this.portfolioRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio no encontrado');
    }

    const portfolioStocks: PortfolioStock[] =
      await this.portfolioStockRepository.find({
        where: {
          portfolio: { id: portfolio.id },
        },
      });

    // Create dto
    const getPortfolioValueDto = new GetPortfolioValueDto();
    getPortfolioValueDto.id = portfolio.id;
    getPortfolioValueDto.balance = portfolio.balance;
    getPortfolioValueDto.totalStocks = portfolioStocks.reduce(
      (accum, pStock) => accum + pStock.amount * pStock.avgPurchasePrice,
      0,
    );

    return getPortfolioValueDto;
  }

  async getMovements(req, limit?: number) {
    const userId = req.user.userId;

    const orders: Order[] = await this.orderRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      take: limit,
    });

    const transactions: Transaction[] = await this.transactionRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      take: limit,
    });

    return {
      orders: orders,
      transactions: transactions,
    };
  }

  async getPortfolio(userId: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!portfolio) {
      throw new NotFoundException(
        `Portfolio de usuario con ID: ${userId} no encontrado`,
      );
    }

    return portfolio;
  }
}
