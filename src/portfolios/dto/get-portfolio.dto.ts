import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class GetPortfolioDto {
  @ApiProperty({ description: 'UUID del portafolio' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nivel de riesgo. Valores entre 1 y 10' })
  @Min(1)
  @Max(10)
  riskLevel: number;

  @ApiProperty({ description: 'Nombre del portafolio' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Saldo del portafolio' })
  @IsNumber()
  balance: number;
}
