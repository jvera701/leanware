"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
let AppController = class AppController {
    constructor(configService) {
        this.configService = configService;
        this.secret = this.configService.get('SECRET');
        this.client_id = this.configService.get('CLIENT_ID');
        this.access_token = this.configService.get('ACCESS_TOKEN');
    }
    async getData(url) {
        const answer = await axios_1.default.post(url, {
            client_id: this.client_id,
            secret: this.secret,
            access_token: this.access_token,
        });
        return answer.data;
    }
    async getBalance() {
        return await this.getData('https://sandbox.plaid.com/accounts/balance/get');
    }
    async getLiabilities() {
        return await this.getData('https://sandbox.plaid.com/liabilities/get');
    }
    async getInvestments() {
        return await this.getData('https://sandbox.plaid.com/investments/holdings/get');
    }
    async getTransactions(start, end, page) {
        const answer = await axios_1.default.post('https://sandbox.plaid.com/transactions/get', {
            client_id: this.client_id,
            secret: this.secret,
            access_token: this.access_token,
            start_date: start,
            end_date: end,
            options: {
                count: 10,
                offset: parseInt(page),
            },
        });
        return answer.data;
    }
};
__decorate([
    (0, common_1.Get)('/balance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Get)('/liabilities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getLiabilities", null);
__decorate([
    (0, common_1.Get)('/investments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getInvestments", null);
__decorate([
    (0, common_1.Get)('/transactions/info?'),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __param(2, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTransactions", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map