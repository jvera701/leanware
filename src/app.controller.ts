import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

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

  @Get('/transactions/info?')
  async getTransactions(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('page') page: string,
  ) {
    const answer = await axios.post(
      'https://sandbox.plaid.com/transactions/get',
      {
        client_id: this.client_id,
        secret: this.secret,
        access_token: this.access_token,
        start_date: start,
        end_date: end,
        options: {
          count: 10,
          offset: parseInt(page),
        },
      },
    );
    return answer.data;
  }
}
