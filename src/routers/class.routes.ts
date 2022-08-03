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
import { authMiddleware } from '../middlewares/auth_middleware';
import { restrictUpdatingCollegeId } from '../shared/functions/update_validators';

export class ClassRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/classes';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, authMiddleware(), getAllClasses);
    this.router.post(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({ body: validateCreateClass }),
      ],
      createClass
    );
    this.router.get(
      `${this.path}/:classId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateClassByIdParam }),
      ],
      findClassById
    );
    this.router.put(
      `${this.path}/:classId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: validateClassByIdParam,
          body: restrictUpdatingCollegeId,
        }),
      ],
      updateClassById
    );
    this.router.delete(
      `${this.path}/:classId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateClassByIdParam }),
      ],
      deleteClassById
    );
  }
}
