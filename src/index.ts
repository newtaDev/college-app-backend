import App from './app';
import { AppKeys } from './config/keys/app_keys';
import { ClassRouter } from './routers/class.routes';
import { CollegeRouter } from './routers/college.routes';
import { CourseRouter } from './routers/course.routes';
import { SubjectRouter } from './routers/subject.routes';
import { ClassTimeTableRouter } from './routers/time_table/class_time_table.routes';
import { TokenRouter } from './routers/token.routes';
import { userRoutes } from './routers/user/user.routes';

const appRoutes = [
  new TokenRouter(),
  ...userRoutes,
  new CollegeRouter(),
  new ClassRouter(),
  new CourseRouter(),
  new SubjectRouter(),
  new ClassTimeTableRouter(),
];

const app = new App({
  appRouters: appRoutes,
  // mongoUri: AppKeys.db_conn_str('college_app'),
  mongoUri: 'mongodb://127.0.0.1:27017',
  port: Number.parseInt((AppKeys.port ?? 1377) as string),
  version: '/v1',
});

app.listen();

// ClassTimeTable.find().populate('teacherId', '-password').then(console.log);
// logger.info('asdas',{'asd':'asdss'})
// logger.error('error log')
// logger.debug('debug log')
// logger.warn('warn log')
