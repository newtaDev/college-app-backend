import { Router } from 'express';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';

import I_BaseRouter from '../routes';
import {
  getAllTeachers,
  deleteTeacherById,
  findTeacherById,
  updateTeacherById,
  getAccessibleClasses,
} from '../../modules/user/teacher/teacher.controller';
import {
  validateAllTeachersQuery,
  validateTeacherByIdParam,
  validateUpdateteacherBody,
} from '../../modules/user/teacher/teacher.validator';

export class TeacherRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user/teachers';
  router: Router;
  private initRoutes(): void {
    this.router.get(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({ query: validateAllTeachersQuery }),
      ],
      getAllTeachers
    );
    this.router.get(
      `${this.path}/accessibleClasses`,
      authMiddleware(),
      getAccessibleClasses
    );
    this.router.get(
      `${this.path}/:teacherId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateTeacherByIdParam }),
      ],
      findTeacherById
    );
    this.router.put(
      `${this.path}/:teacherId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: validateTeacherByIdParam,
          body: validateUpdateteacherBody,
        }),
      ],
      updateTeacherById
    );
    this.router.delete(
      `${this.path}/:teacherId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateTeacherByIdParam }),
      ],
      deleteTeacherById
    );
  }
}
