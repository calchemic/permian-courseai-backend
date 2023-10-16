import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../model/user.model';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
