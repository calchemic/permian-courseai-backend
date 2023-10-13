import { InternalServerErrorException } from '@nestjs/common';
import { buildSchema, pre, prop } from '@typegoose/typegoose';
import { ObjectId, Schema } from 'mongoose';

/**
 * All model classes must extend this.
 */
@pre<BaseModel>('save', function () {
  if (this.isNew) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
})
@pre<BaseModel>('updateOne', function () {
  // @ts-ignore
  this.updatedAt = new Date();
})
export class BaseModel {
  readonly _id!: ObjectId;

  @prop()
  createdAt: Date;

  @prop({ select: false })
  updatedAt: Date;

  protected static throwMongoError(err: any): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  static get schema(): Schema {
    return buildSchema(this as any, {});
  }

  static get modelName(): string {
    return this.name;
  }
}
