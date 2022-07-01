import Joi from 'joi';

export const createTokenWithRefreshTokenValidator = Joi.object({
    refreshToken: Joi.string().required().min(10),
  });

  export const decodeDataFromTokenValidator = Joi.object({
    token: Joi.string().required().min(10),
  });
  