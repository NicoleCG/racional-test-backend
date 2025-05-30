import { GetTransactionDto } from '../dto/get-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export class TransactionMapper {
  static entityToDto(entity: Transaction): GetTransactionDto {
    const dto = new GetTransactionDto();
    dto.id = entity.id;
    dto.amount = entity.amount;
    dto.type = entity.type;
    dto.date = entity.date;
    dto.userId = entity.user.id;

    return dto;
  }
}
