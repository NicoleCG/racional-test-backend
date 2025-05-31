import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Stock } from './entities/stocks.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order, Stock, Portfolio])],
})
export class OrdersModule {}
