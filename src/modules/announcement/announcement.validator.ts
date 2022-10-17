import Joi from 'joi';
import { AnnouncementLayoutType, AnounceTo } from '../../utils/enums';
import { joiObject } from '../../shared/helpers/joi.helper';
import { Validators } from '../../shared/validators/validators';
import { I_Announcement, I_AnnouncementFormDataFiles } from './announcement.model';

export const validateAnnouncementIdParam = joiObject({
  announcementId: Validators.mongoIdValidator().required(),
});
export const validateCreateBody = joiObject<I_Announcement>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  anounceTo: Joi.string()
    .valid(...Object.values(AnounceTo))
    .required(),
  announcementLayoutType: Joi.string()
    .valid(...Object.values(AnnouncementLayoutType))
    .required(),
  anounceToClassIds: Joi.array().items(Validators.mongoIdValidator()),
  collegeId: Validators.mongoIdValidator(),
});
export const validateCreateFormData = joiObject<I_AnnouncementFormDataFiles>({
  imageFile: Validators.validImage(),
  multipleFiles: Joi.any(),
});
export const validateListAllForStudentQuery = joiObject({
  anounceToClassId: Joi.string().required(),
  showMyClassesOnly: Joi.bool().default(false),
});
export const validateListAllForTeacherQuery = joiObject({
  teacherId: Joi.string().required(),
  showAnnouncementsCreatedByMe: Joi.bool().default(false),
});

export * as announcementValidator from './announcement.validator';
