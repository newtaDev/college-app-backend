import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import { profileController } from '../../modules/user/profile/profile.controller';
import { profileValidator } from '../../modules/user/profile/profile.validator';
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
    this.router.get(`${this.path}/search`, [
      authMiddleware(),
      validateSchemaMiddleware({
        query: profileValidator.validateProfileSearchQuery,
      }),
      profileController.searchUserProfiles,
    ]);
    this.router.get(
      `${this.path}/:userId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: profileValidator.validateGetUserProfileParam,
          query: profileValidator.validateGetUserProfileQuery,
        }),
      ],
      profileController.getUserProfileData
    );
    this.router.put(`${this.path}/:userId`);
    this.router.delete(`${this.path}/:userId`);
  }
}
