import { GetUserDto } from '../dto/get-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static entityToDto(entity: User): GetUserDto {
    const dto = new GetUserDto();
    dto.id = entity.id;
    dto.rut = entity.rut;
    dto.name = entity.name;
    dto.username = entity.username;
    dto.email = entity.email;

    return dto;
  }
}
