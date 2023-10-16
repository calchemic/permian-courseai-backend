import { IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  useCase: string;

  @IsString()
  @IsUrl()
  file: string;

  @IsString()
  template: string;

  @IsString()
  preference: string;
}
