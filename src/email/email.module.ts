import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AWSSES } from '../common/aws/config.aws';
import { SendRawEmailCommand } from '@aws-sdk/client-ses';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        SES: {
          ses: AWSSES,
          aws: { SendRawEmailCommand },
        },
        sendingRate: 1,
      },
    }),
  ],
  providers: [EmailService],
})
export class EmailModule {}
