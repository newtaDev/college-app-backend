import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppKeys } from '../../../config/keys/app_keys';
import logger from '../../../utils/logger';

export const createAccessToken = (payload: object) => {
  try {
    const _token = jwt.sign(
      { data: payload },
      AppKeys.jwt_access_key as jwt.Secret,
      {
        expiresIn: '15m',
      }
    );
    return _token;
  } catch (error) {
    logger.debug(`---Create Access Token Failed---`);
    throw error;
  }
};

export const createQrToken = (payload: object) => {
  try {
    const _token = jwt.sign(
      { data: payload },
      AppKeys.jwt_qr_key as jwt.Secret
    );
    return _token;
  } catch (error) {
    logger.debug(`---Create Qr Token Failed---`);
    throw error;
  }
};
export const createRefreshToken = (payload: object) => {
  try {
    const _token = jwt.sign(
      { data: payload },
      AppKeys.jwt_refresh_key as jwt.Secret,
      {
        expiresIn: '1y',
      }
    );
    return _token;
  } catch (error) {
    logger.debug(`---Create Refresh Token Failed---`);
    throw error;
  }
};
export const createOtpToken = (payload: object) => {
  try {
    const _token = jwt.sign(
      { data: payload },
      AppKeys.jwt_otp_key as jwt.Secret,
      {
        expiresIn: '5m',
      }
    );
    return _token;
  } catch (error) {
    logger.debug(`---Create OTP Token Failed---`);
    throw error;
  }
};

export const verifyAndDecodeAccessToken = (
  token: string
): string | JwtPayload => {
  try {
    const payload = jwt.verify(token, AppKeys.jwt_access_key as jwt.Secret);
    logger.info('--- Verified Access Token ---');
    return payload;
  } catch (error) {
    logger.debug(`---Access Token Failed---`);
    throw error;
  }
};

export const verifyAndDecodeRefreshToken = (
  token: string
): string | JwtPayload => {
  try {
    const payload = jwt.verify(token, AppKeys.jwt_refresh_key as jwt.Secret);
    logger.info(`--- Verified Refresh Token ---`);
    return payload;
  } catch (error) {
    logger.debug(`---Refresh Token Failed ---`);
    throw error;
  }
};
export const verifyAndDecodeOtpToken = (
  token: string
): string | JwtPayload => {
  try {
    const payload = jwt.verify(token, AppKeys.jwt_otp_key as jwt.Secret);
    logger.info(`--- Verified OTP Token ---`);
    return payload;
  } catch (error) {
    logger.debug(`---OTP Token Failed ---`);
    throw error;
  }
};
export * as jwtServices from './jwt_services';
