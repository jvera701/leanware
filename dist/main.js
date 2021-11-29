"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const authorization = configService.get('AUTHORIZATION');
    function logger(req, res, next) {
        try {
            const token = req.get('Authorization');
            if (token === authorization) {
                next();
            }
            else {
                res.status(401).json({ error: 'Invalid Token' });
                return;
            }
        }
        catch (error) {
            console.error(error);
            next();
        }
    }
    app.use(logger);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map