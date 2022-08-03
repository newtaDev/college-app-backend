import mongoose from 'mongoose';
import { I_JwtUserPayload } from '../services/jwt/jwt_interfaces';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user: I_JwtUserPayload;
    }
  }
}
