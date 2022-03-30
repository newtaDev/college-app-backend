import dotenv from 'dotenv';
dotenv.config();

export class _Secrets {
  static MONGO_URI = process.env.MONGO_URI as string;
  static JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY as string;
  static JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY as string;
}
