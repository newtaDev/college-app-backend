import { Router } from 'express';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';

import I_BaseRouter from '../routes';
import {
  getAllTeachers,
  deleteTeacherById,
  findTeacherById,
  updateTeacherById,
  getAssignedClasses,
} from '../../modules/user/teacher/teacher.controller';
import {
  validateAllTeachersQuery,
  validateTeacherByIdParam,
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
      `${this.path}/assignedClasses`,
      authMiddleware(),
      getAssignedClasses
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
