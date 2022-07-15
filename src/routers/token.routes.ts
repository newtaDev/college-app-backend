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
import I_BaseRouter from './routes';
import { authMiddleware } from '../middlewares/auth_middleware';

export class TokenRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/token';
  router: Router;
  private initRoutes(): void {
    // route for creating access token from refresh token
    this.router.post(
      `${this.path}/re_create`,
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
