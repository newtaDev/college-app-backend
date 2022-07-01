import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ApiException } from '../shared/exceptions/api_exceptions';
import { verfyAccessToken } from '../shared/services/jwt/jwt_service';
import logger from '../utils/logger';

export const authMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken || !bearerToken.startsWith('Bearer '))
        throw new Error('No token Found');
      const accessToken = bearerToken.split('Bearer ')[1];
      /** verify Access Token */
      const payload = verfyAccessToken(accessToken) as JwtPayload;
      req.user = payload.data;
      logger.info('Route Authorized');
      next();
    } catch (error) {
      return next(
        new ApiException({
          message: 'Authorization failed',
          devMsg: error instanceof Error ? error.message : null,
          statuscode: 401,
        })
      );
    }
  };
