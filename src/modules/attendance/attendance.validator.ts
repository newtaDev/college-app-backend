import Joi from 'joi';
import { joiObject } from '../../utils/helpers';
import { Validators } from '../../utils/validators';
import { I_Attendance } from './attendance.model';

export const validateAttendanceByIdParam = joiObject({
  attendanceId: Validators.mongoIdValidator().required(),
});
export const validateCreateAttendance = joiObject<I_Attendance>({
  _id: Validators.mongoIdValidator(),
  classId: Validators.mongoIdValidator().required(),
  collegeId: Validators.mongoIdValidator().required(),
  subjectId: Validators.mongoIdValidator().required(),
  currentSem: Joi.number().required(),
  classStartTime: Joi.string()
    .custom(Validators.is24HoursTime)
    .message('Invalid Time! ex: 07:20 or ex: 18:10')
    .required(),
  classEndTime: Joi.string()
    .custom(Validators.is24HoursTime)
    .message('Invalid Time! ex: 07:20 or ex: 18:10')
    .required(),
  absentStudents: Joi.array().items(Validators.mongoIdValidator()).required(),
  ///ex:  07 22 2022
  attendanceTakenOn: Joi.date().required(),
});

export const validateAttendancesWithAllSubjects = joiObject({
  classId: Validators.mongoIdValidator(),
  currentSem: Joi.number(),
  collegeId: Validators.mongoIdValidator(),
});

export const validateAbsentStudentsReportInEachSubject = joiObject({
  classId: Validators.mongoIdValidator().required(),
  subjectId: Validators.mongoIdValidator().required(),
  currentSem: Joi.number().required(),
  collegeId: Validators.mongoIdValidator(),
});
