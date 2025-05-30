import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { JwtDto } from './dto/jwt.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotExistUserPipe } from 'src/users/pipes/not-exists-user.pipe';
import { HashPipe } from './pipes/hash.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(NotExistUserPipe, HashPipe)
  @ApiOperation({ summary: 'Realizar login de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Login realizado correctamente',
    type: JwtDto,
  })
  @ApiResponse({ status: 401, description: 'Error al iniciar sesión' })
  async login(@Body() loginDto: LoginDto): Promise<JwtDto> {
    const user: GetUserDto = await this.authService.validateUser(loginDto);
    return this.authService.login(user);
  }
}
