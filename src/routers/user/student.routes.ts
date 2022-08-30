import { Router } from 'express';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';

import I_BaseRouter from '../routes';
import {
  getAllStudents,
  deleteStudentById,
  findStudentById,
  updateStudentById,
} from '../../modules/user/student/student.controller';
import {
  validateAllStudentsinClassQuery,
  validateStudentByIdParam,
} from '../../modules/user/student/student.validator';

export class StudentRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user/students';
  router: Router;
  private initRoutes(): void {
    this.router.get(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({ query: validateAllStudentsinClassQuery }),
      ],
      getAllStudents
    );
    this.router.get(
      `${this.path}/:studentId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateStudentByIdParam }),
      ],
      findStudentById
    );
    this.router.put(
      `${this.path}/:studentId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateStudentByIdParam }),
      ],
      updateStudentById
    );
    this.router.delete(
      `${this.path}/:studentId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateStudentByIdParam }),
      ],
      deleteStudentById
    );
  }
}
