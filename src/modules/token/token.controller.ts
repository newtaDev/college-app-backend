import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../../shared/services/jwt/jwt_service';

/**
 * First trys to verify token from `refresh token` and then creates new `access and refresh token` form it
 */
export const createAccessTokenFromRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = verifyRefreshToken(req.body.refreshToken) as JwtPayload;
    console.log(payload);
    const accessToken = createAccessToken(payload.data);
    const refreshToken = createRefreshToken(payload.data);
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

/**
 * First trys to decode data from `refresh token` if faies jumps to `access token`
 */
export const decodeDataFromToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    try {
      const payload = verifyRefreshToken(req.body.token) as JwtPayload;
      res.send(successResponse(payload));
    } catch (error) {
      const payload = verifyAccessToken(req.body.token) as JwtPayload;
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
