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

  async getData(url: string) {
    const answer = await axios.post(url, {
      client_id: this.client_id,
      secret: this.secret,
      access_token: this.access_token,
    });
    return answer.data;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/balance')
  async getBalance() {
    return await this.getData('https://sandbox.plaid.com/accounts/balance/get');
  }

  @Get('/liabilities')
  async getLiabilities() {
    return await this.getData('https://sandbox.plaid.com/liabilities/get');
  }

  @Get('/investments')
  async getInvestments() {
    return await this.getData(
      'https://sandbox.plaid.com/investments/holdings/get',
    );
  }
}
