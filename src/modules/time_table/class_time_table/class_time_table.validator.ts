import Joi from 'joi';
import { Week } from '../../../utils/enums';
import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../utils/validators';
import { I_ClassTimeTable } from './class_time_table.model';

export const validateClassTimeTableByIdParam = joiObject({
  classTTid: Validators.mongoIdValidator().required(),
});

export const validateCreateClassTimeTable = joiObject<I_ClassTimeTable>({
  collegeId: Validators.mongoIdValidator(),
  classId: Validators.mongoIdValidator().required(),
  subjectId: Validators.mongoIdValidator().required(),
  teacherId: Validators.mongoIdValidator().required(),
  startingTime: Joi.string()
    .custom(Validators.is24HoursTime)
    .message('Invalid Time! ex: 07:20 or ex: 18:10')
    .required(),
  endingTime: Joi.string()
    .custom(Validators.is24HoursTime)
    .message('Invalid Time! ex: 07:20 or ex: 18:10')
    .required(),
  week: Joi.string()
    .valid(...Object.values(Week))
    .required(),
});
