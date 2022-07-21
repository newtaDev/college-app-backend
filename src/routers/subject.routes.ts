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
} from '../modules/subject/subject.validator';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';

import I_BaseRouter from './routes';

export class SubjectRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/subjects';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, getAllSubjects);
    this.router.post(
      this.path,
      validateSchemaMiddleware({ body: validateCreateSubject }),
      createSubject
    );
    this.router.get(
      `${this.path}/:subjectId`,
      validateSchemaMiddleware({ params: validateSubjectByIdParam }),
      findSubjectById
    );
    this.router.put(
      `${this.path}/:subjectId`,
      validateSchemaMiddleware({ params: validateSubjectByIdParam }),
      updateSubjectById
    );
    this.router.delete(
      `${this.path}/:subjectId`,
      validateSchemaMiddleware({ params: validateSubjectByIdParam }),
      deleteSubjectById
    );
  }
}
