import App from './app';
import { AppKeys } from './config/keys/app_keys';
import { TokenRouter } from './routers/token.routes';

const app = new App({
  appRouters: [new TokenRouter()],
  mongoUri: AppKeys.db_conn_str('minimalShop'),
  port: Number.parseInt((AppKeys.port ?? 1377) as string),
  version: '/v1',
});

app.listen();

// logger.info('asdas',{'asd':'asdss'})
// logger.error('error log')
// logger.debug('debug log')
// logger.warn('warn log')
