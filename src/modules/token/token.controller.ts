import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import {
  createAccessToken,
  createRefreshToken,
  verfyAccessToken,
  verfyRefreshToken,
} from '../../shared/services/jwt/jwt_service';
export const createAccessTokenFromRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const payload: JwtPayload = verfyRefreshToken(
    //   req.body.refreshToken
    // ) as JwtPayload;
    // if (jwtError) throw new Error('Invalid token');
    // console.log(payload);
    const accessToken = createAccessToken({ name: 'newta -a' });
    const refreshToken = createRefreshToken({ name: 'newta -r' });
    const _response = successResponse({
      accessToken,
      refreshToken,
    });
    return res.send(_response);
  } catch (error) {
    return next(
      new ApiException({
        message: 'Token creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 401,
      })
    );
  }
};

export const decodeDataFromToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * First trys to decode data from `refresh token` if faies jumps to `access token`
     */
    try {
      const payload = verfyRefreshToken(req.body.token) as JwtPayload;
      res.send(successResponse(payload));
    } catch (error) {
      const payload = verfyAccessToken(req.body.token) as JwtPayload;
      res.send(successResponse(payload));
    }
  } catch (error) {
    return next(
      new ApiException({
        message: 'Token verification failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 401,
      })
    );
  }
};
