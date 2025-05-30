import { IsEnum, IsNumber, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeTransaction } from '../enum/typeTransaction.enum';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Cantidad de la transferencia' })
  @Type(() => Number)
  @IsNumber()
  @Min(1) // To limit the minimum of the transaction to $1
  amount: number;

  @ApiProperty({
    description: 'Tipo de transacción: Depósito o Retiro',
    enum: TypeTransaction,
  })
  @IsEnum(TypeTransaction)
  type: TypeTransaction;

  date?: Date;
}
