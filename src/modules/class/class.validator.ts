import Joi from 'joi';
import { I_ClassAssignedTo } from '../../shared/interfaces/interfaces';
import { joiObject } from '../../utils/helpers';
import { Validators } from '../../utils/validators';
import { I_Class } from './class.model';

export const validateClassByIdParam = joiObject({
  classId: Validators.mongoIdValidator().required(),
});

export const validateCreateClass = joiObject<I_Class>({
  name: Joi.string().required(),
  classNumber: Joi.string().required(),
  collegeId: Validators.mongoIdValidator().required(),
  courseId: Validators.mongoIdValidator().required(),
  assignedTo: Joi.object<I_ClassAssignedTo>({
    name: Joi.string().required(),
    userId: Validators.mongoIdValidator().required(),
  }).required(),
});
