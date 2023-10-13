import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { BaseModel } from '../model/base.model';

@Injectable()
export abstract class BaseService<T extends BaseModel> {
  protected constructor(
    @InjectModel(BaseModel)
    protected readonly model: ReturnModelType<AnyParamConstructor<T>>,

    protected eventEmitter: EventEmitter2 = new EventEmitter2(),
  ) {
    this.model = model;
  }

  protected static throwMongoError(err: any): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }
}
