import Joi from 'joi';
import { UserType } from '../../../utils/enums';
import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../utils/validators';

export const validateGetUserProfileQuery = joiObject({
  userType: Joi.string()
    .valid(...Object.values(UserType))
    .required(),
});
export const validateProfileSearchQuery = joiObject({
  searchText: Joi.string().required(),
});

export const validateGetUserProfileParam = joiObject({
  userId: Validators.mongoIdValidator().required(),
});

export * as profileValidator from './profile.validator';
