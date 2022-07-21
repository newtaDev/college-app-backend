import Joi from 'joi';
import { joiObject } from '../../utils/helpers';
import { Validators } from '../../utils/validators';
import { I_Course } from './course.model';

export const validateCourseByIdParam = joiObject({
  courseId: Validators.mongoIdValidator().required(),
});
export const validateCreateCourse = joiObject<I_Course>({
  name: Joi.string().required(),
  collegeId: Validators.mongoIdValidator().required(),
  mainSubjectIds: Joi.array().items(Validators.mongoIdValidator()),
  optionalSubjectIds: Joi.array().items(Validators.mongoIdValidator()),
});
