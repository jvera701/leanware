import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const authorization = configService.get('AUTHORIZATION');

  // Middleware function
  function logger(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.get('Authorization');
      if (token === authorization) {
        next();
      } else {
        res.status(401).json({ error: 'Invalid Token' });
        return;
      }
    } catch (error) {
      console.error(error);
      next();
    }
  }

  app.use(logger);
  await app.listen(3000);
}
bootstrap();
