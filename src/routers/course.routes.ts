import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import { authMiddleware } from '../middlewares/auth_middleware';
import {
  createCourse,
  getAllCourses,
  findCourseById,
  updateCourseById,
  deleteCourseById,
} from '../modules/course/course.controller';
import {
  validateCourseByIdParam,
  validateCreateCourse,
} from '../modules/course/course.validator';
import I_BaseRouter from './routes';
import { restrictUpdatingCollegeId } from '../shared/functions/update_validators';

export class CourseRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/courses';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, authMiddleware(), getAllCourses);
    this.router.post(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({ body: validateCreateCourse }),
      ],
      createCourse
    );
    this.router.get(
      `${this.path}/:courseId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateCourseByIdParam }),
      ],
      findCourseById
    );
    this.router.put(
      `${this.path}/:courseId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: validateCourseByIdParam,
          body: restrictUpdatingCollegeId,
        }),
      ],
      updateCourseById
    );
    this.router.delete(
      `${this.path}/:courseId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateCourseByIdParam }),
      ],
      deleteCourseById
    );
  }
}
