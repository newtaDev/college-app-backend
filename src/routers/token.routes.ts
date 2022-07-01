import { Router } from 'express';
import {
  createAccessTokenFromRefreshToken,
  decodeDataFromToken,
} from '../modules/token/token.controller';
import {
  createTokenWithRefreshTokenValidator,
  decodeDataFromTokenValidator,
} from '../modules/token/token.validator';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import I_BaseRouter from './router';
import { authMiddleware } from '../middlewares/auth_middleware';

export class TokensRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/token';
  router: Router;
  private initRoutes(): void {
    // route for creating access token from refresh token
    this.router.post(
      `${this.path}/new`,
      validateSchemaMiddleware({ body: createTokenWithRefreshTokenValidator }),
      createAccessTokenFromRefreshToken
    );
    this.router.post(
      `${this.path}/decode`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ body: decodeDataFromTokenValidator }),
      ],
      decodeDataFromToken
    );
  }
}
