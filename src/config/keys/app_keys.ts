import { _Secrets } from './secrets';

export class AppKeys {
  static jwt_access_key = `pre_encoder_access_token${_Secrets.JWT_ACCESS_KEY}`;
  static jwt_qr_key = `pre_encoder_qr_token${_Secrets.JWT_QR_KEY}`;
  static jwt_otp_key = `pre_encoder_qr_token${_Secrets.JWT_OTP_KEY}`;
  static jwt_refresh_key = `pre_encoder_refresh_token${_Secrets.JWT_REFRESH_KEY}`;
  static port = process.env.PORT;
  static env = process.env.NODE_ENV;
  static aws_bucket_name = _Secrets.AWS_BUCKET_NAME;
  static aws_s3_anouncemet_folder_name = 'announcements/';
  static aws_bucket_region = _Secrets.AWS_BUCKET_REGION;
  static aws_user_access_key = _Secrets.AWS_USER_ACCESS_KEY;
  static aws_user_secret_access_key = _Secrets.AWS_USER_SECRET_ACCESS_KEY;
  static email_address = _Secrets.EMAIL_ADDRESS as string;
  static email_password = _Secrets.EMAIL_PASSWORD as string;
  static app_version = 'v1';
  static default_db = 'college_db';
  static app_name = 'College App Backend';
  static error_log_path = 'error.log';

  private static _mongo_uri = `mongodb+srv://${_Secrets.MONGO_USERNAME}:${_Secrets.MONGO_PASSWORD}@cluster0.vhi4o.mongodb.net`;
  static db_conn_str = (db?: string): string => {
    if (db) this.default_db = db;
    return `${this._mongo_uri}/${this.default_db}?retryWrites=true&w=majority`;
  };
}
