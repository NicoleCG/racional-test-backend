import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetTransactionDto } from './dto/get-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // Endpoint to create a transaction
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateTransactionDto })
  @ApiOperation({ summary: 'Crear una transacción (depósito o retiro)' })
  @ApiResponse({ status: 200, description: 'Transacción creada correctamente' })
  @ApiResponse({ status: 400, description: 'Error al crear transacción' })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req,
  ): Promise<GetTransactionDto> {
    return await this.transactionsService.create(req, createTransactionDto);
  }
}
