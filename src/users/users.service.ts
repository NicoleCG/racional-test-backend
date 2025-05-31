import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/services/hashing.service';
import { UserMapper } from './mappers/user.mapper';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private hashingService: HashingService,
  ) {}

  async update(req, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    const userId = req.user.userId;

    // Check new username doesn't exist already
    if (updateUserDto.username) {
      const existUser = await this.userRepository.existsBy({
        username: updateUserDto.username,
      });

      if (existUser) {
        throw new BadRequestException(
          `El username: ${updateUserDto.username} ya existe`,
        );
      }
    }
    // Modify user information
    const user = await this.userRepository.preload({
      id: userId,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${userId} no encontrado`);
    }
    const userModified = await this.userRepository.save(user);
    return UserMapper.entityToDto(userModified);
  }

  async validateCredentials(loginDto: LoginDto): Promise<GetUserDto | null> {
    // Find User in DB
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });

    if (!user) {
      return null;
    }

    // Validate user's password
    if (this.hashingService.getHash(loginDto.password) !== user.passwordHash) {
      return null;
    }
    return UserMapper.entityToDto(user);
  }
}
