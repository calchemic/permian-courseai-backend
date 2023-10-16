import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
