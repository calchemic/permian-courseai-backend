import { IsMongoId, IsString, IsUrl } from 'class-validator';
import { BaseModel } from './base.model';
import { Ref, prop } from '@typegoose/typegoose';
import { User } from './user.model';

export class Video extends BaseModel {
  @IsString()
  @prop({ required: false })
  useCase: string;

  @IsString()
  @IsUrl()
  @prop({ required: false })
  file: string;

  @IsString()
  @prop({ required: false })
  template: string;

  @IsString()
  @prop({ required: false })
  preference: string;

  @IsMongoId()
  @prop({
    required: true,
    type: () => [User],
    ref: () => User,
  })
  user!: Ref<User>;
}
