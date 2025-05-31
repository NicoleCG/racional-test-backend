import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { TypeOrder } from '../enum/typeOrder.enum';
import { IsString } from '@nestjs/class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Cantidad de acciones' })
  @Type(() => Number)
  @IsNumber()
  @Min(0.01) // To limit the minimum of the transaction
  amount: number;

  @ApiProperty({
    description: 'Tipo de movimiento: compra o venta de acciones',
    enum: TypeOrder,
  })
  @IsEnum(TypeOrder)
  type: TypeOrder;

  @ApiProperty({ description: 'Precio unitario de la acción' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Ticker de la acción' })
  @IsString()
  stockTicker: string;

  date?: Date;
}
