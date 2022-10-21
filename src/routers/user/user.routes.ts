import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import { authValidator } from '../../modules/user/auth/auth.validator';
import { userController } from '../../modules/user/user.controller';
import I_BaseRouter from '../routes';

export class UserRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user';
  router: Router;
  private initRoutes(): void {
    /// Loged in User details from token
    this.router.get(
      `${this.path}/details`,
      authMiddleware(),
      userController.getUserDetailsFromToken
    );

    this.router.post(
      `${this.path}/changePassword`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          body: authValidator.validateChangePasswordBody,
        }),
      ],
      userController.changePassword
    );
  }
}
