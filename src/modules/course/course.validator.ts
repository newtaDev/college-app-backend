import Joi from 'joi';
import { joiObject } from '../../shared/helpers/joi.helper';
import { Validators } from '../../shared/validators/validators';
import { I_Course } from './course.model';

export const validateCourseByIdParam = joiObject({
  courseId: Validators.mongoIdValidator().required(),
});
export const validateCreateCourse = joiObject<I_Course>({
  _id: Validators.mongoIdValidator(),
  name: Joi.string().required(),
  collegeId: Validators.mongoIdValidator(),
  totalSem: Joi.number().required(),
});
