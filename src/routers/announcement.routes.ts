import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import { authMiddleware } from '../middlewares/auth_middleware';
import I_BaseRouter from './routes';
import { announcementController } from '../modules/announcement/announcement.controller';
import { announcementValidator } from '../modules/announcement/announcement.validator';
import { multerServices } from '../shared/services/multer_services';

export class AnnouncementRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/announcements';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, authMiddleware(), announcementController.getAll);
    this.router.get(
      `${this.path}/students`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: announcementValidator.validateListAllForStudentQuery,
        }),
      ],
      announcementController.getAllForStudents
    );
    this.router.get(
      `${this.path}/teachers`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: announcementValidator.validateListAllForTeacherQuery,
        }),
      ],
      announcementController.getAllForTeachers
    );
    this.router.post(
      this.path,
      [
        authMiddleware(),
        multerServices.multerClient().any(),
        validateSchemaMiddleware({
          body: announcementValidator.validateCreateBody,
          formDataFiles: announcementValidator.validateCreateFormData,
        }),
      ],
      announcementController.create
    );
    this.router.get(
      `${this.path}/:announcementId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: announcementValidator.validateAnnouncementIdParam,
        }),
      ],
      announcementController.findById
    );
    this.router.put(
      `${this.path}/:announcementId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: announcementValidator.validateAnnouncementIdParam,
        }),
      ],
      announcementController.updateById
    );
    this.router.delete(
      `${this.path}/:announcementId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: announcementValidator.validateAnnouncementIdParam,
        }),
      ],
      announcementController.deleteById
    );
  }
}
