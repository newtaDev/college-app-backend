import Joi from 'joi';
import { UserType } from '../../../utils/enums';
import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../utils/validators';
import { I_Admin } from '../admin.model';
import { I_Faculty } from '../faculty.model';
import { I_Student } from '../student.model';
import { I_Teacher } from '../teacher.model';

export const validateTeacherRegistration = joiObject<I_Teacher>({
  email: Joi.string().email().required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  collegeId: Validators.mongoIdValidator().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
});
export const validateFacultyRegistration = joiObject<I_Faculty>({
  email: Joi.string().email().required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  collegeId: Validators.mongoIdValidator().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
});
export const validateStudentRegistration = joiObject<I_Student>({
  email: Joi.string().email().required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  classId: Validators.mongoIdValidator().required(),
  collegeId: Validators.mongoIdValidator().required(),
  courseId: Validators.mongoIdValidator().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
  mySubjectIds: Joi.array().items(Validators.mongoIdValidator()), //"mySubjectIds":["62d629dec8fa5623574e387a"]
});

export const validateAdminRegistration = joiObject<I_Admin>({
  email: Joi.string().email().required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
});
export const validateUserLogin = joiObject({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userType: Joi.string()
    .valid(...Object.values(UserType))
    .required(),
});
