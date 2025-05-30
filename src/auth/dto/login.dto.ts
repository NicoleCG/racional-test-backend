import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'crivas', description: 'Username del usuario' })
  @IsNotEmpty({ message: 'Introducir username' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'password1', description: 'Contraseña del usuario' })
  @IsNotEmpty({ message: 'Introducir contraseña' })
  @IsString()
  readonly password: string;
}
