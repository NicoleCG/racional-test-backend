import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([Transaction, User, Portfolio])],
})
export class TransactionsModule {}
