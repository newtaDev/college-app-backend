import { Router } from 'express';
import {
  deleteInitialData,
  importInitialData,
} from '../modules/seeder/seeder.controller';
import I_BaseRouter from './routes';

export class SeederRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/seeder';
  router: Router;
  private initRoutes(): void {
    this.router.get(`${this.path}/import`, importInitialData);
    this.router.delete(`${this.path}/delete`, deleteInitialData);
  }
}
