import { Router } from 'express';
import I_BaseRouter from './routes';

export class ClassRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/classs';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path);
    this.router.post(this.path);
    this.router.get(`${this.path}/:classId`);
    this.router.put(`${this.path}/:classId`);
    this.router.delete(`${this.path}/:classId`);
  }
}
