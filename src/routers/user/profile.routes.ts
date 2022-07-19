import { Router } from 'express';
import I_BaseRouter from '../routes';

export class ProfileRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user/profile';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path);
    this.router.post(this.path);
    this.router.get(`${this.path}/:profile_id`);
    this.router.put(`${this.path}/:profile_id`);
    this.router.delete(`${this.path}/:profile_id`);
  }
}
