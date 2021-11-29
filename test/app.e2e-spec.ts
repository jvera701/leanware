import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const authorization = configService.get('AUTHORIZATION');
    token = authorization;

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
    await app.init();
  });

  describe('GET /balance', function () {
    it('not authorized, responds with 401', () => {
      const ans = request(app.getHttpServer()).get('/balance');
      return ans.expect(401);
    });

    it('authorized, responds with 200', () => {
      const ans = request(app.getHttpServer())
        .get('/balance')
        .set('Authorization', token);
      return ans.expect(200);
    });
  });

  describe('GET /liabilities', function () {
    it('not authorized, responds with 401', () => {
      const ans = request(app.getHttpServer()).get('/liabilities');
      return ans.expect(401);
    });

    it('authorized, responds with 200', () => {
      const ans = request(app.getHttpServer())
        .get('/liabilities')
        .set('Authorization', token);
      return ans.expect(200);
    });
  });

  describe('GET /investments', function () {
    it('not authorized, responds with 401', () => {
      const ans = request(app.getHttpServer()).get('/investments');
      return ans.expect(401);
    });

    it('authorized, responds with 200', () => {
      const ans = request(app.getHttpServer())
        .get('/investments')
        .set('Authorization', token);
      return ans.expect(200);
    });
  });

  describe('GET /transactions', function () {
    it('not authorized, responds with 401', () => {
      const ans = request(app.getHttpServer()).get(
        '/transactions/info?start=2020-01-01&end=2020-02-01&page=0',
      );
      return ans.expect(401);
    });

    it('authorized, responds with 200', () => {
      const ans = request(app.getHttpServer())
        .get('/transactions/info?start=2020-01-01&end=2020-02-01&page=0')
        .set('Authorization', token);
      return ans.expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
