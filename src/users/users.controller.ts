import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Modify user information
  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Modificar información del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Información de usuario modificada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear modificar información de usuario',
  })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<GetUserDto> {
    return await this.usersService.update(req, updateUserDto);
  }
}
