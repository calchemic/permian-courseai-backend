import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { fromEnv } from '@aws-sdk/credential-providers';
import { SESClient, CloneReceiptRuleSetCommand } from '@aws-sdk/client-ses';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  @OnEvent('user.login')
  async handleWelcomeMail(payload) {
    console.log('triggerred');
    console.log(payload);
    const body = {
      from: 'admin@getbubblez.com',
      to: ['biswasrajorshee8@gmail.com', 'ali@alchemic.ca'],
      subject: 'New Login | Permian Course',
      html: `<p>Hey there, </p>
        <p>There is a new login for user at email: ${payload.email} </b></p>
        <p>Happy Learning!<br/>
        Team Permian</p>
      `,
    };
    await this.mailerService.sendMail(body);
  }
}
