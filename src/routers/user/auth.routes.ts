import { Router } from 'express';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import {
  loginUser,
  registerAsAdmin,
  registerAsFaculty,
  registerAsStudent,
  registerAsTeacher,
} from '../../modules/user/auth/auth.controller';
import {
  validateAdminRegistration,
  validateFacultyRegistration,
  validateStudentRegistration,
  validateTeacherRegistration,
  validateUserLogin,
} from '../../modules/user/auth/auth.validator';
import I_BaseRouter from '../routes';

export class AuthRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user';
  router: Router;
  private initRoutes(): void {
    /// Login routes
    this.router.post(
      `${this.path}/login`,
      validateSchemaMiddleware({ body: validateUserLogin }),
      loginUser
    );

    /// registration routes
    this.router.post(
      `${this.path}/register/teacher`,
      validateSchemaMiddleware({ body: validateTeacherRegistration }),
      registerAsTeacher
    );
    this.router.post(
      `${this.path}/register/faculty`,
      validateSchemaMiddleware({ body: validateFacultyRegistration }),
      registerAsFaculty
    );
    this.router.post(
      `${this.path}/register/student`,
      validateSchemaMiddleware({ body: validateStudentRegistration }),
      registerAsStudent
    );
    this.router.post(
      `${this.path}/register/admin`,
      validateSchemaMiddleware({ body: validateAdminRegistration }),
      registerAsAdmin
    );

    ///
    this.router.post(`${this.path}/generate/otp`);
    this.router.get(`${this.path}/verify/otp`);
    this.router.get(`${this.path}/verify/email`);
  }
}
