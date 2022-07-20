import { Router } from 'express';
import I_BaseRouter from './routes';

export class SubjectRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/subjects';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path);
    this.router.post(this.path);
    this.router.get(`${this.path}/:subjectId`);
    this.router.put(`${this.path}/:subjectId`);
    this.router.delete(`${this.path}/:subjectId`);
  }
}
