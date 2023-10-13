import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  password: string;
}
