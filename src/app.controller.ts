import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  secret = this.configService.get<string>('SECRET');
  client_id = this.configService.get<string>('CLIENT_ID');
  access_token = this.configService.get<string>('ACCESS_TOKEN');

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/balance')
  async getBalance() {
    const answer = await axios.post('https://sandbox.plaid.com/balance/get', {
      client_id: this.client_id,
      secret: this.secret,
      access_token: this.access_token,
    });
    return answer.data;
  }

  @Get('/liabilities')
  async getLiabilities() {
    const answer = await axios.post(
      'https://sandbox.plaid.com/liabilities/get',
      {
        client_id: this.client_id,
        secret: this.secret,
        access_token: this.access_token,
      },
    );
    return answer.data;
  }
}
