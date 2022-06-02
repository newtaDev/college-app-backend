import { Router, Request, Response } from 'express';
import App from '../app';
import { AppKeys } from '../config/keys/app_keys';

export default interface I_BaseRouter {
  path: string;
  router: Router;
}

export class InitialRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/';
  router: Router;
  private initRoutes(): void {
    // welcome
    this.router.get('/', (req: Request, res: Response) => {
      res.send('Welcome to our API');
    });
    // Check health
    this.router.get('/health', (req: Request, res: Response) => {
      res.status(200).send({
        status: 'OK',
        upTime: process.uptime(),
      });
    });
    this.router.get('/info', (req: Request, res: Response) => {
      // Get all main routes in the api
      const paths: string[] = [];
      App.routers.forEach(route => {
        paths.push(route.path);
      });
      res.send({
        status: 'OK',
        name: AppKeys.app_name,
        app_version: AppKeys.app_version,
        node_version: process.version,
        enviroment: AppKeys.env,
        routes: paths,
      });
    });
  }
}
