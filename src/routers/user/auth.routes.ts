import { Router } from 'express';
import I_BaseRouter from '../routes';

export class AuthRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user';
  router: Router;
  private initRoutes(): void {
    this.router.post(`${this.path}/login`);
    this.router.post(`${this.path}/register`);

    this.router.post(`${this.path}/generate/otp`);

    this.router.get(`${this.path}/verify/otp`);
    this.router.get(`${this.path}/verify/email`);
  }
}
