import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionMapper } from './mappers/transaction.mapper';
import { GetTransactionDto } from './dto/get-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    req,
    createTransactionDto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    // Add datetime to Dto
    createTransactionDto.date = new Date();

    // Save in DB
    const transaction: Transaction = await this.transactionRepository.create({
      ...createTransactionDto,
      user: { id: req.user.userId },
    });
    console.log(transaction);
    const transactionCreated =
      await this.transactionRepository.save(transaction);

    return TransactionMapper.entityToDto(transactionCreated);
  }
}
