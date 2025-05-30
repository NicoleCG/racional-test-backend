import { BadRequestException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

export class NotExistUserPipe implements PipeTransform {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async transform(value: any) {
    // Validate if user exists or not
    const exists: boolean = await this.userRepository.existsBy({
      username: value.username,
    });
    if (!exists) {
      throw new BadRequestException('El usuario no existe');
    }
    return value;
  }
}
