import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import {
  getAllColleges,
  findCollegeById,
  deleteCollegeById,
  createCollege,
  updateCollegeById,
} from '../modules/college/college.controller';
import {
  validateCollegeByIdParam,
  validateCreateCollege,
} from '../modules/college/college.validator';
import I_BaseRouter from './routes';

export class CollegeRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/colleges';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, getAllColleges);
    this.router.post(
      this.path,
      validateSchemaMiddleware({ body: validateCreateCollege }),
      createCollege
    );
    this.router.get(
      `${this.path}/:collegeId`,
      validateSchemaMiddleware({ params: validateCollegeByIdParam }),
      findCollegeById
    );
    this.router.put(
      `${this.path}/:collegeId`,
      validateSchemaMiddleware({ params: validateCollegeByIdParam }),
      updateCollegeById
    );
    this.router.delete(
      `${this.path}/:collegeId`,
      validateSchemaMiddleware({ params: validateCollegeByIdParam }),
      deleteCollegeById
    );
  }
}
