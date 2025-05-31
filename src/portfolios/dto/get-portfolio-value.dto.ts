import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class GetPortfolioValueDto {
  @ApiProperty({ description: 'UUID del portafolio' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Saldo total del usuario' })
  @IsNumber()
  balance: number;

  @ApiProperty({
    description: 'Total en acciones según precio promedio de compra',
  })
  @IsNumber()
  totalStocks: number;
}
