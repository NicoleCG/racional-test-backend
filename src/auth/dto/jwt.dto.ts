import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({ description: 'Token JWT' })
  token: string;
}
