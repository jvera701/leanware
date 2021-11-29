import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private configService;
    constructor(configService: ConfigService);
    secret: string;
    client_id: string;
    access_token: string;
    getData(url: string): Promise<any>;
    getBalance(): Promise<any>;
    getLiabilities(): Promise<any>;
    getInvestments(): Promise<any>;
    getTransactions(start: string, end: string, page: string): Promise<any>;
}
