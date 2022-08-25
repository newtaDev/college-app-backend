import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import { getUserProfileData } from '../../modules/user/profile/profile.controller';
import {
  validateGetUserProfileParam,
  validateGetUserProfileQuery,
} from '../../modules/user/profile/profile.validator';
import I_BaseRouter from '../routes';

export class ProfileRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user/profiles';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path);
    this.router.post(this.path);
    this.router.get(
      `${this.path}/:userId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: validateGetUserProfileParam,
          query: validateGetUserProfileQuery,
        }),
      ],
      getUserProfileData
    );
    this.router.put(`${this.path}/:userId`);
    this.router.delete(`${this.path}/:userId`);
  }
}
