import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from '@nestjs/class-validator';
import { Matches } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Nuevo nombre del usuario',
    example: 'Juan Pérez',
  })
  @Matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({ description: 'Nuevo username del usuario', example: 'jperez' })
  @IsOptional()
  @IsString()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9\.\-]+$/, {
    message:
      'El username solo puede contener guión bajo, guión, letras y números, sin espacios',
  })
  username?: string;
}
