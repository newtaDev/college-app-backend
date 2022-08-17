import Joi from 'joi';
import { joiObject } from '../../utils/helpers';
import { Validators } from '../../utils/validators';
import { I_Class } from './class.model';

export const validateClassByIdParam = joiObject({
  classId: Validators.mongoIdValidator().required(),
});

export const validateCreateClass = joiObject<I_Class>({
  _id: Validators.mongoIdValidator(),
  name: Joi.string().required(),
  classNumber: Joi.string().required(),
  collegeId: Validators.mongoIdValidator(),
  courseId: Validators.mongoIdValidator().required(),
  currentSem: Joi.number().required(),
  batch: Joi.number().required(),
  // assignedTo: Joi.object<I_ClassAssignedTo>({
  //   name: Joi.string().required(),
  //   userId: Validators.mongoIdValidator().required(),
  // }).required(),
  assignedToId: Validators.mongoIdValidator().required(), // should pass teacherId
  isCollegeCompleted: Joi.boolean(),
});
