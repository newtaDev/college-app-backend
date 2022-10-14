import Joi from 'joi';
import { AnouncementLayoutType, AnounceTo } from '../../utils/enums';
import { joiObject } from '../../shared/helpers/joi.helper';
import { Validators } from '../../shared/validators/validators';
import { I_Anouncement, I_AnouncementFormDataFiles } from './anouncement.model';

export const validateAnouncementIdParam = joiObject({
  anouncementId: Validators.mongoIdValidator().required(),
});
export const validateCreateBody = joiObject<I_Anouncement>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  anounceTo: Joi.string()
    .valid(...Object.values(AnounceTo))
    .required(),
  anouncementLayoutType: Joi.string()
    .valid(...Object.values(AnouncementLayoutType))
    .required(),
  anounceToClassIds: Joi.array().items(Validators.mongoIdValidator()),
  collegeId: Validators.mongoIdValidator(),
});
export const validateCreateFormData = joiObject<I_AnouncementFormDataFiles>({
  imageFile: Validators.validImage(),
  multipleFiles: Joi.any(),
});
export const validateListAllForStudentQuery = joiObject({
  anounceToClassId: Joi.string().required(),
  showMyClassesOnly: Joi.bool().default(false),
});
export const validateListAllForTeacherQuery = joiObject({
  teacherId: Joi.string().required(),
  showAnouncementsCreatedByMe: Joi.bool().default(false),
});

export * as anouncementValidator from './anouncement.validator';
