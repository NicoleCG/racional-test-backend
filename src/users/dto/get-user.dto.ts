import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ description: 'ID único del usuario' })
  public id: string;

  @ApiProperty({ description: 'RUT del usuario' })
  public rut: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  public name: string;

  @ApiProperty({ description: 'Username del usuario' })
  public username: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  public email: string;
}
