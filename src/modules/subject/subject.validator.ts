import Joi from 'joi';
import { joiObject } from '../../shared/helpers/joi.helper';
import { Validators } from '../../shared/validators/validators';
import { I_Subject } from './subject.model';

export const validateSubjectByIdParam = joiObject({
  subjectId: Validators.mongoIdValidator().required(),
});

export const validateSubjectQuery = joiObject<I_Subject>({
  courseId: Validators.mongoIdValidator(),
  classId: Validators.mongoIdValidator(),
  assignedTo: Validators.mongoIdValidator(),
});
export const validateCreateSubject = joiObject<I_Subject>({
  _id: Validators.mongoIdValidator(),
  name: Joi.string().required(),
  collegeId: Validators.mongoIdValidator(),
  courseId: Validators.mongoIdValidator().required(),
  classId: Validators.mongoIdValidator().required(),
  assignedTo: Validators.mongoIdValidator().required(),
  isMainSubject: Joi.boolean().required(),
  semester: Joi.number().required(),
});

export * as subjectValidator from './subject.validator';
