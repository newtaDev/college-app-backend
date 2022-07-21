import Joi from 'joi';
import { joiObject } from '../../utils/helpers';
import { Validators } from '../../utils/validators';
import { I_Subject } from './subject.model';

export const validateSubjectByIdParam = joiObject({
  subjectId: Validators.mongoIdValidator().required(),
});
export const validateCreateSubject = joiObject<I_Subject>({
  name: Joi.string().required(),
  collegeId: Validators.mongoIdValidator().required(),
});
