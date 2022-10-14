import Joi from 'joi';
import { joiObject } from '../../shared/helpers/joi.helper';
import { Validators } from '../../shared/validators/validators';
import { I_College } from './college.model';

export const validateCollegeByIdParam = joiObject({
  collegeId: Validators.mongoIdValidator().required(),
});
export const validateCreateCollege = joiObject<I_College>({
  _id: Validators.mongoIdValidator(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  mobile: Joi.number().required(),
  website: Joi.string().required(),
  address: Joi.string().required(),
  description: Joi.string().required(),
  landPhone: Joi.number(),
});
