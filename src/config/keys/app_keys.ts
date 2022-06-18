import { _Secrets } from './secrets';

export class AppKeys {
  static jwt_access_key = `pre_encoder_access_token${_Secrets.JWT_ACCESS_KEY}`;
  static jwt_refresh_key = `pre_encoder_refresh_token${_Secrets.JWT_ACCESS_KEY}`;
  static port = process.env.PORT;
  static env = process.env.NODE_ENV;
  static app_version = 'v1';
  static app_name = 'Express Typescript Template';
  static error_log_path = 'error.log';

  private static _mongo_uri = `mongodb+srv://${_Secrets.MONGO_USERNAME}:${_Secrets.MONGO_PASSWORD}@cluster0.vhi4o.mongodb.net`;
  static db_conn_str = (db: string): string =>
    `${this._mongo_uri}/${db}?retryWrites=true&w=majority`;
}
