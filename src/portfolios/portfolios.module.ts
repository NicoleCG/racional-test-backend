import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioStock } from './entities/portfolioStock.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  imports: [
    TypeOrmModule.forFeature([Portfolio, PortfolioStock, Order, Transaction]),
  ],
})
export class PortfoliosModule {}
