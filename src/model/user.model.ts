import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { BaseModel } from './base.model';
import { prop } from '@typegoose/typegoose';

export enum Role {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
}

export class User extends BaseModel {
  @IsEmail()
  @IsString()
  @prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @IsString()
  @prop({ required: false })
  firstName: string;

  @IsString()
  @prop({ required: false })
  lastName: string;

  @IsString()
  @prop({ required: false })
  password: string;

  @IsEnum(Role)
  @IsString()
  @prop({ enum: Role })
  role: Role;

  @IsString()
  @prop({ required: false })
  phone: string;
}
