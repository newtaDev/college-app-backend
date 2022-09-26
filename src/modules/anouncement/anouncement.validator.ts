import Joi from 'joi';
import { AnouncementLayoutType, AnounceTo } from '../../utils/enums';
import { joiObject } from '../../utils/helpers';
import { Validators } from '../../utils/validators';
import { I_Anouncement, I_AnouncementFormDataFiles } from './anouncement.model';

export const validateAnouncementIdParam = joiObject({
  anouncementId: Validators.mongoIdValidator().required(),
});
export const validateCreateBody = joiObject<I_Anouncement>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  anounce_to: Joi.string()
    .valid(...Object.values(AnounceTo))
    .required(),
  anouncementLayoutType: Joi.string()
    .valid(...Object.values(AnouncementLayoutType))
    .required(),
  anounce_to_classIds: Joi.array(),
  collegeId: Validators.mongoIdValidator(),
});
export const validateCreateFormData = joiObject<I_AnouncementFormDataFiles>({
  imageFile: Validators.validImage(),
  multipleFiles: Joi.array().items(Validators.validImage()),
});

export * as anouncementValidator from './anouncement.validator';
