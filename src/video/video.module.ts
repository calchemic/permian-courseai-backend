import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { AuthModule } from '../auth/auth.module';
import { Video } from '../model/video.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [AuthModule, TypegooseModule.forFeature([Video])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
