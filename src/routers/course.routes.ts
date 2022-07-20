import { Router } from 'express';
import I_BaseRouter from './routes';

export class CourseRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/courses';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path);
    this.router.post(this.path);
    this.router.get(`${this.path}/:courseId`);
    this.router.put(`${this.path}/:courseId`);
    this.router.delete(`${this.path}/:courseId`);
  }
}
