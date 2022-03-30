import { _Secrets } from './secrets';

export class AppKeys {
  static mongo_uri = _Secrets.MONGO_URI;

  static jwt_access_key = `pre_encoder_access_token${_Secrets.JWT_ACCESS_KEY}`;

  static jwt_refresh_key = `pre_encoder_refresh_token${_Secrets.JWT_ACCESS_KEY}`;

  static port = process.env.PORT;
  
  static env = process.env.NODE_ENV;
}
