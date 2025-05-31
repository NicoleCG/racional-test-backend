import { IsOptional } from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, Max, Min } from 'class-validator';
import { CreatePortfolioDto } from './create-portfolio.dto';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {
  @ApiProperty({
    description: 'Nivel de riesgo. Valores entre 1 y 10',
    example: 5,
  })
  @IsOptional()
  @Min(1)
  @Max(10)
  riskLevel?: number;

  @ApiProperty({
    description: 'Nombre del portafolio',
    example: 'Portafolio de Juan Pérez',
  })
  @IsOptional()
  @IsString()
  name: string;
}
