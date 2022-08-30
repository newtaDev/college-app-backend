import dotenv from 'dotenv';
dotenv.config();

export class _Secrets {
  static MONGO_USERNAME = process.env.MONGO_USERNAME as string;
  static MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
  static JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY as string;
  static JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY as string;
  static JWT_QR_KEY = process.env.JWT_QR_KEY as string;
}
