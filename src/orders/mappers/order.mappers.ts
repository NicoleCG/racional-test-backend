import { GetOrderDto } from '../dto/get-order.dto';
import { Order } from '../entities/order.entity';

export class OrderMapper {
  static entityToDto(entity: Order): GetOrderDto {
    const dto = new GetOrderDto();
    dto.id = entity.id;
    dto.amount = entity.amount;
    dto.type = entity.type;
    dto.date = entity.date;
    dto.userId = entity.user.id;
    dto.price = entity.price;
    dto.stockTicker = entity.stock.ticker;

    return dto;
  }
}
