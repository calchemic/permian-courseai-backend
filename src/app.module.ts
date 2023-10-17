import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { VideoModule } from './video/video.module';
import { VoiceModule } from './voice/voice.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRoot(process.env.MONGODB_URI, {}),
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    CommonModule,
    VideoModule,
    VoiceModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
