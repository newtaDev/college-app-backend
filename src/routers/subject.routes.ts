import { Router } from 'express';
import {
  createSubject,
  deleteSubjectById,
  findSubjectById,
  getAllSubjects,
  updateSubjectById,
} from '../modules/subject/subject.controller';
import {
  validateCreateSubject,
  validateSubjectByIdParam,
  validateSubjectQuery,
} from '../modules/subject/subject.validator';
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
        validateSchemaMiddleware({ query: validateSubjectQuery }),
      ],
      getAllSubjects
    );
    this.router.post(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({ body: validateCreateSubject }),
      ],
      createSubject
    );
    this.router.get(
      `${this.path}/:subjectId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateSubjectByIdParam }),
      ],
      findSubjectById
    );
    this.router.put(
      `${this.path}/:subjectId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: validateSubjectByIdParam,
          body: restrictUpdatingCollegeId,
        }),
      ],
      updateSubjectById
    );
    this.router.delete(
      `${this.path}/:subjectId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateSubjectByIdParam }),
      ],
      deleteSubjectById
    );
  }
}
