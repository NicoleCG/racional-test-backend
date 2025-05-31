import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsDate, IsEnum, IsNumber, IsUUID, Min } from '@nestjs/class-validator';
import { TypeTransaction } from '../enum/typeTransaction.enum';

export class GetTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty({ description: 'UUID de la transferencia' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Cantidad de la transferencia' })
  @IsNumber()
  @Min(1) // To limit the minimum of the transaction to $1
  amount: number;

  @ApiProperty({
    description: 'Tipo de transacción: Depósito o Retiro',
    enum: TypeTransaction,
  })
  @IsEnum(TypeTransaction)
  type: TypeTransaction;

  @ApiProperty({
    description: 'Fecha y hora de la transferencia',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Id del usuario que realizó transferencia',
  })
  userId: string;
}
