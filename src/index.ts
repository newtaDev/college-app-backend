import App from './app';
import { AppKeys } from './config/keys/app_keys';
import { appRoutes } from './routers/routes';
import { createQrToken } from './shared/services/jwt/jwt_service';
const app = new App({
  appRouters: appRoutes,
  // mongoUri: AppKeys.db_conn_str('college_app'),
  mongoUri: 'mongodb://127.0.0.1:27017',
  port: Number.parseInt((AppKeys.port ?? 1377) as string),
  version: '/v1',
});
app.listen();

console.log(createQrToken({ Name: 'as' }));

// collegeDb.Class.find().populate('assignedToId').then(console.log);
// logger.info('asdas',{'asd':'asdss'})
// logger.error('error log')
// logger.debug('debug log')
// logger.warn('warn log')
