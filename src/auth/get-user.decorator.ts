import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/model/user.model';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Partial<User> => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
