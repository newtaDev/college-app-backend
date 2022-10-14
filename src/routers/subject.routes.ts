import { Router } from 'express';
import { subjectController } from '../modules/subject/subject.controller';
import { subjectValidator } from '../modules/subject/subject.validator';
import { authMiddleware } from '../middlewares/auth_middleware';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';

import I_BaseRouter from './routes';
import { restrictUpdatingCollegeId } from '../shared/validators/joi_validators';

export class SubjectRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/subjects';
  router: Router;
  private initRoutes(): void {
    this.router.get(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: subjectValidator.validateSubjectQuery,
        }),
      ],
      subjectController.getAllSubjects
    );
    this.router.post(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          body: subjectValidator.validateCreateSubject,
        }),
      ],
      subjectController.createSubject
    );
    this.router.get(
      `${this.path}/:subjectId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: subjectValidator.validateSubjectByIdParam,
        }),
      ],
      subjectController.findSubjectById
    );
    this.router.put(
      `${this.path}/:subjectId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: subjectValidator.validateSubjectByIdParam,
          body: restrictUpdatingCollegeId,
        }),
      ],
      subjectController.updateSubjectById
    );
    this.router.delete(
      `${this.path}/:subjectId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: subjectValidator.validateSubjectByIdParam,
        }),
      ],
      subjectController.deleteSubjectById
    );
  }
}
