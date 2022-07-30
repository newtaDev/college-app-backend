import { Router } from 'express';
import { validateSchemaMiddleware } from '../../middlewares/validation_middleware';
import I_BaseRouter from '../routes';
import { authMiddleware } from '../../middlewares/auth_middleware';
import {
  validateClassTimeTableByIdParam,
  validateCreateClassTimeTable,
} from '../../modules/time_table/class_time_table/class_time_table.validator';
import {
  createClassTimeTable,
  deleteClassTimeTableById,
  findClassTimeTableById,
  getAllClassTimeTables,
  updateClassTimeTableById,
} from '../../modules/time_table/class_time_table/class_time_table.controller';

export class ClassTimeTableRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/time_table/class';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, authMiddleware(), getAllClassTimeTables);
    this.router.post(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({ body: validateCreateClassTimeTable }),
      ],
      createClassTimeTable
    );
    this.router.get(
      `${this.path}/:classTTidid`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateClassTimeTableByIdParam }),
      ],
      findClassTimeTableById
    );
    this.router.put(
      `${this.path}/:classTTid`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateClassTimeTableByIdParam }),
      ],
      updateClassTimeTableById
    );
    this.router.delete(
      `${this.path}/:classTTid`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateClassTimeTableByIdParam }),
      ],
      deleteClassTimeTableById
    );
  }
}
