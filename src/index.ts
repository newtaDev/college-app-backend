import App from './app';
import { AppKeys } from './config/keys/keys';

const app = new App({
  appRouters: [],
  mongoUri: AppKeys.mongo_uri,
  port: Number.parseInt((AppKeys.port ?? 1377) as string),
  version: '/v1',
});

app.listen();
