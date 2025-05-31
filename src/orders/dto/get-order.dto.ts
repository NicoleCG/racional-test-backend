import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsDate, IsEnum, IsNumber, IsUUID, Min } from 'class-validator';
import { TypeOrder } from '../enum/typeOrder.enum';

export class GetOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ description: 'UUID de la orden' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Cantidad de la orden' })
  @IsNumber()
  @Min(0.01) // To limit the minimum of the order
  amount: number;

  @ApiProperty({
    description: 'Tipo de orden: Compra o Venta',
    enum: TypeOrder,
  })
  @IsEnum(TypeOrder)
  type: TypeOrder;

  @ApiProperty({
    description: 'Fecha y hora de la orden',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Id del usuario que realizó la orden',
  })
  userId: string;

  @ApiProperty({ description: 'Precio de la acción' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Ticker de la acción' })
  stockTicker: string;
}
