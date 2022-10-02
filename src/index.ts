import App from './app';
import { AppKeys } from './config/keys/app_keys';
import { appRoutes } from './routers/routes';

const app = new App({
  appRouters: appRoutes,
  // mongoUri: AppKeys.db_conn_str('college_app'),
  mongoUri: 'mongodb://127.0.0.1:27017',
  port: Number.parseInt((AppKeys.port ?? 1377) as string),
  version: '/v1',
});
app.listen();

// generateQr(
//   JSON.stringify({
//     id: 'sdsdsd73487436483',
//     navigateTo: 'profile_screen',
//   })
// ).then(console.log);

//  authService.getUserWithQuery({}).then(console.log)
// collegeDb.Class.find().populate('assignedToId').then(console.log);
// logger.info('asdas',{'asd':'asdss'})
// logger.error('error log')
// logger.debug('debug log')
// logger.warn('warn log')
