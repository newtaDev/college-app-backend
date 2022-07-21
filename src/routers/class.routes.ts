import { Router } from 'express';
import {
  createClass,
  deleteClassById,
  findClassById,
  getAllClasses,
  updateClassById,
} from '../modules/class/class.controller';
import {
  validateClassByIdParam,
  validateCreateClass,
} from '../modules/class/class.validator';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import I_BaseRouter from './routes';

export class ClassRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/classes';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, getAllClasses);
    this.router.post(
      this.path,
      validateSchemaMiddleware({ body: validateCreateClass }),
      createClass
    );
    this.router.get(
      `${this.path}/:classId`,
      validateSchemaMiddleware({ params: validateClassByIdParam }),
      findClassById
    );
    this.router.put(
      `${this.path}/:classId`,
      validateSchemaMiddleware({ params: validateClassByIdParam }),
      updateClassById
    );
    this.router.delete(
      `${this.path}/:classId`,
      validateSchemaMiddleware({ params: validateClassByIdParam }),
      deleteClassById
    );
  }
}
