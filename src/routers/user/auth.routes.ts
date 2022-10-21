import { Router } from 'express';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import { authController } from '../../modules/user/auth/auth.controller';
import { authValidator } from '../../modules/user/auth/auth.validator';
import I_BaseRouter from '../routes';

export class AuthRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user/auth';
  router: Router;
  private initRoutes(): void {
    /// Login routes
    this.router.post(
      `${this.path}/login`,
      validateSchemaMiddleware({ body: authValidator.validateUserLogin }),
      authController.loginUser
    );

    /// registration routes
    this.router.post(
      `${this.path}/register/teacher`,
      validateSchemaMiddleware({
        body: authValidator.validateTeacherRegistration,
      }),
      authController.registerAsTeacher
    );
    this.router.post(
      `${this.path}/register/faculty`,
      validateSchemaMiddleware({
        body: authValidator.validateFacultyRegistration,
      }),
      authController.registerAsFaculty
    );
    this.router.post(
      `${this.path}/register/student`,
      validateSchemaMiddleware({
        body: authValidator.validateStudentRegistration,
      }),
      authController.registerAsStudent
    );
    this.router.post(
      `${this.path}/register/admin`,
      validateSchemaMiddleware({
        body: authValidator.validateAdminRegistration,
      }),
      authController.registerAsAdmin
    );

    this.router.get(
      `${this.path}/forgotPassword`,
      validateSchemaMiddleware({
        query: authValidator.validateForgotPasswordQuery,
      }),
      authController.forgotPassword
    );
    this.router.post(
      `${this.path}/resetPassword`,
      validateSchemaMiddleware({
        query: authValidator.validateResetPasswordQuery,
        body: authValidator.validateResetPasswordBody,
      }),
      authController.resetPassword
    );

    /// Validation
    this.router.get(
      `${this.path}/validate/`,
      validateSchemaMiddleware({
        query: authValidator.checkUserExistsValidationQuery,
      }),
      authController.checkUserExists
    );
    this.router.get(`${this.path}/verify/otp`);
    this.router.get(`${this.path}/verify/email`);
  }
}
