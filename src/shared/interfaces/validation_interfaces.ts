import Joi from 'joi';

export interface I_RequestValidator {
  body?: Joi.Schema;
  params?: Joi.Schema;
  query?: Joi.Schema;
  formDataFiles?: Joi.Schema;
  formDataFile?: Joi.Schema;
}

