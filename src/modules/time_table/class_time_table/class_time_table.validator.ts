import Joi from 'joi';
import { Week } from '../../../utils/enums';
import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../shared/validators/validators';
import { I_ClassTimeTable } from './class_time_table.model';

export const validateClassTimeTableByIdParam = joiObject({
  id: Validators.mongoIdValidator().required(),
});
export const validateClassTimeTableQuery = joiObject({
  teacherId: Validators.mongoIdValidator(),
  classId: Validators.mongoIdValidator(),
  week: Joi.string().valid(...Object.values(Week)),
});

export const validateCreateClassTimeTable = joiObject<I_ClassTimeTable>({
  _id: Validators.mongoIdValidator(),
  collegeId: Validators.mongoIdValidator(),
  classId: Validators.mongoIdValidator().required(),
  subjectId: Validators.mongoIdValidator().required(),
  teacherId: Validators.mongoIdValidator().required(),
  startingTime: Validators.validate24HoursTime()
    .message('Invalid Time! ex: 07:20 or ex: 18:10')
    .required(),
  endingTime: Validators.validate24HoursTime()
    .message('Invalid Time! ex: 07:20 or ex: 18:10')
    .required(),
  week: Joi.string()
    .valid(...Object.values(Week))
    .required(),
});
