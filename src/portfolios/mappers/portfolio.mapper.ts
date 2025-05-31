import { GetPortfolioDto } from '../dto/get-portfolio.dto';
import { Portfolio } from '../entities/portfolio.entity';

export class PortfolioMapper {
  static entityToDto(entity: Portfolio): GetPortfolioDto {
    const dto = new GetPortfolioDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.riskLevel = entity.riskLevel;
    dto.balance = entity.balance;

    return dto;
  }
}
