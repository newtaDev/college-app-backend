import { Router } from 'express';
import I_BaseRouter from './routes';

export class UserRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/user';
  router: Router;
  private initRoutes(): void {
    this.authRoutes();
    this.profileRoutes();
  }

  private authRoutes() {
    this.router.post(`${this.path}/login`);
    this.router.post(`${this.path}/register`);

    this.router.post(`${this.path}/generate/otp`);

    this.router.get(`${this.path}/verify/otp`);
    this.router.get(`${this.path}/verify/email`);
  }
  
  private profileRoutes() {
    this.router.get(`${this.path}/profile`);
    this.router.put(`${this.path}/profile`);
  }
}
