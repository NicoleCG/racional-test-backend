import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtDto } from './dto/jwt.dto';
import { GetUserDto } from 'src/users/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user: GetUserDto =
      await this.userService.validateCredentials(loginDto);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  async login(user: GetUserDto): Promise<JwtDto> {
    const payload = { username: user.username, sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
