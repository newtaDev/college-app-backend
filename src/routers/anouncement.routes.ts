import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import { authMiddleware } from '../middlewares/auth_middleware';
import I_BaseRouter from './routes';
import { anouncementController } from '../modules/anouncement/anouncement.controller';
import { anouncementValidator } from '../modules/anouncement/anouncement.validator';
import { multerServices } from '../shared/services/multer_services';

export class AnouncementRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/anouncements';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, authMiddleware(), anouncementController.getAll);
    this.router.get(
      `${this.path}/students`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: anouncementValidator.validateListAllForStudentQuery,
        }),
      ],
      anouncementController.getAllForStudents
    );
    this.router.get(
      `${this.path}/teachers`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: anouncementValidator.validateListAllForTeacherQuery,
        }),
      ],
      anouncementController.getAllForTeachers
    );
    this.router.post(
      this.path,
      [
        authMiddleware(),
        multerServices.multerClient().any(),
        validateSchemaMiddleware({
          body: anouncementValidator.validateCreateBody,
          formDataFiles: anouncementValidator.validateCreateFormData,
        }),
      ],
      anouncementController.create
    );
    this.router.get(
      `${this.path}/:anouncementId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: anouncementValidator.validateAnouncementIdParam,
        }),
      ],
      anouncementController.findById
    );
    this.router.put(
      `${this.path}/:anouncementId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: anouncementValidator.validateAnouncementIdParam,
        }),
      ],
      anouncementController.updateById
    );
    this.router.delete(
      `${this.path}/:anouncementId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: anouncementValidator.validateAnouncementIdParam,
        }),
      ],
      anouncementController.deleteById
    );
  }
}
