import Joi from 'joi';

export interface I_RequestValidator {
  body?: Joi.Schema;
  params?: Joi.Schema;
  query?: Joi.Schema;
}

