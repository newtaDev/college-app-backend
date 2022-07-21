import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
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

export class CourseRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/courses';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, getAllCourses);
    this.router.post(
      this.path,
      validateSchemaMiddleware({ body: validateCreateCourse }),
      createCourse
    );
    this.router.get(
      `${this.path}/:courseId`,
      validateSchemaMiddleware({ params: validateCourseByIdParam }),
      findCourseById
    );
    this.router.put(
      `${this.path}/:courseId`,
      validateSchemaMiddleware({ params: validateCourseByIdParam }),
      updateCourseById
    );
    this.router.delete(
      `${this.path}/:courseId`,
      validateSchemaMiddleware({ params: validateCourseByIdParam }),
      deleteCourseById
    );
  }
}
