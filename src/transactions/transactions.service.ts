import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { DataSource } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionDto } from './dto/get-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TypeTransaction } from './enum/typeTransaction.enum';
import { TransactionMapper } from './mappers/transaction.mapper';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    req,
    createTransactionDto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    const userId = req.user.userId;

    // Add datetime to Dto
    createTransactionDto.date = new Date();

    const transactionCreated = await this.dataSource.transaction(
      async (manager) => {
        // Find portfolio
        const portfolio = await manager.findOne(Portfolio, {
          where: { user: { id: userId } },
          relations: ['user'],
          lock: { mode: 'pessimistic_write' },
        });

        if (!portfolio) {
          throw new NotFoundException('Portfolio no encontrado');
        }

        // Check if the user has sufficient balance
        if (createTransactionDto.type == TypeTransaction.WITHDRAWAL) {
          if (portfolio.balance < createTransactionDto.amount) {
            throw new BadRequestException('Saldo insuficiente');
          }
        }

        // Update user's balance
        if (createTransactionDto.type == TypeTransaction.DEPOSIT) {
          portfolio.balance += createTransactionDto.amount;
        } else {
          portfolio.balance -= createTransactionDto.amount;
        }
        await manager.save(portfolio);

        // Save in DB
        const transaction: Transaction = manager.create(Transaction, {
          ...createTransactionDto,
          user: { id: userId },
        });
        return await manager.save(transaction);
      },
    );

    return TransactionMapper.entityToDto(transactionCreated);
  }
}
