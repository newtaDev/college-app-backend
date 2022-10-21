import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import { authMiddleware } from '../middlewares/auth_middleware';

import I_BaseRouter from './routes';
import { subjectPostController } from '../modules/subject_resource/subject_resource.controller';
import { subjectPostValidator } from '../modules/subject_resource/subject_resource.validator';
import { fileServices } from '../shared/services/file.services';

export class SubjectResourceRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/subject-resources';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, authMiddleware(), subjectPostController.getAll);
    this.router.get(
      `${this.path}/getAllSubjectResourcesWithCount`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: subjectPostValidator.validateSubjectSubjectResourceQuery,
        }),
      ],
      subjectPostController.getAllSubjectResourcesWithCount
    );
    this.router.post(
      this.path,
      [
        authMiddleware(),
        fileServices.multerClient().any(),
        validateSchemaMiddleware({
          body: subjectPostValidator.validateCreateBody,
          formDataFiles: subjectPostValidator.validateCreateFormData,
        }),
      ],
      subjectPostController.create
    );
    this.router.post(`${this.path}/:resourceId/addComment`, [
      authMiddleware(),
      validateSchemaMiddleware({
        body: subjectPostValidator.validateCommentBody,
        params: subjectPostValidator.validateSubjectResourceByIdParam,
      }),
      subjectPostController.addComment,
    ]);
    this.router.get(
      `${this.path}/:resourceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: subjectPostValidator.validateSubjectResourceByIdParam,
        }),
      ],
      subjectPostController.findById
    );
    this.router.put(
      `${this.path}/:resourceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: subjectPostValidator.validateSubjectResourceByIdParam,
        }),
      ],
      subjectPostController.updateById
    );
    this.router.delete(
      `${this.path}/:resourceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: subjectPostValidator.validateSubjectResourceByIdParam,
        }),
      ],
      subjectPostController.deleteById
    );
    this.router.delete(
      `${this.path}/:resourceId/:commentId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: subjectPostValidator.validateDeleteCommentByIdParam,
        }),
      ],
      subjectPostController.deleteCommentById
    );
  }
}
