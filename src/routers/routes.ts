import { Router, Request, Response } from 'express';
import App from '../app';
import { AppKeys } from '../config/keys/app_keys';
import { AnouncementRouter } from './anouncement.routes';
import { AttendanceRouter } from './attendance.routes';
import { ClassRouter } from './class.routes';
import { CollegeRouter } from './college.routes';
import { CourseRouter } from './course.routes';
import { SeederRouter } from './seeder.routes';
import { SubjectRouter } from './subject.routes';
import { ClassTimeTableRouter } from './time_table/class_time_table.routes';
import { TokenRouter } from './token.routes';
import { userRoutes } from './user/user.routes';

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

export const appRoutes = [
  new TokenRouter(),
  new SeederRouter(),
  ...userRoutes,
  new CollegeRouter(),
  new ClassRouter(),
  new CourseRouter(),
  new SubjectRouter(),
  new ClassTimeTableRouter(),
  new AttendanceRouter(),
  new AnouncementRouter(),
];
