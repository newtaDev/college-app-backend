import mongoose from 'mongoose';
import App from '../../app';
import { appRoutes } from '../../routers/routes';

export const testApp = new App({
  appRouters: appRoutes,
  // mongoUri: AppKeys.db_conn_str('college_app'),
  mongoUri: 'mongodb://127.0.0.1:27017',
  port: 1378,
  version: '/v1',
  isTestingEnv: true,
});
export const disconnectAllTestingDb = async () => {
  await mongoose.connection.close();
};

// run -->    yarn test / yarn test --detectOpenHandles
