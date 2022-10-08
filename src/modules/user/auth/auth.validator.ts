import Joi from 'joi';
import { UserType } from '../../../utils/enums';
import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../shared/validators/validators';
import { I_Admin } from '../admin.model';
import { I_Faculty } from '../faculty.model';
import { I_Student } from '../student/student.model';
import { I_Teacher } from '../teacher/teacher.model';
export const validateTeacherRegistration = joiObject<I_Teacher>({
  _id: Validators.mongoIdValidator(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  collegeId: Validators.mongoIdValidator().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
  assignedClasses: Joi.array().items(Validators.mongoIdValidator()).required(),
  assignedSubjects: Joi.array().items(Validators.mongoIdValidator()).required(),
  email: Joi.string().email(),
  username: Validators.validateUsername().message('Invalid username'),
  isProfileCompleted: Joi.bool(),
  phoneNumber: Joi.number(),
  currentAddress: Joi.string(),
  dob: Joi.date().required(),
  bio: Joi.string().max(150),
  emoji: Joi.string(),
});

export const validateFacultyRegistration = joiObject<I_Faculty>({
  _id: Validators.mongoIdValidator(),
  email: Joi.string().email().required(),
  username: Validators.validateUsername()
    .message('Invalid username')
    .required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  collegeId: Validators.mongoIdValidator().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
});

export const validateStudentRegistration = joiObject<I_Student>({
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  classId: Validators.mongoIdValidator().required(),
  collegeId: Validators.mongoIdValidator().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
  _id: Validators.mongoIdValidator(),
  email: Joi.string().email(),
  username: Validators.validateUsername().message('Invalid username'),
  isProfileCompleted: Joi.bool(),
  phoneNumber: Joi.number(),
  parentsNumber: Joi.number(),
  currentAddress: Joi.string(),
  dob: Joi.date().required(),
  myOptionalSubjects: Joi.array().items(Validators.mongoIdValidator()), //"mySubjectIds":["62d629dec8fa5623574e387a"]
  bio: Joi.string().max(150),
  emoji: Joi.string(),
});

export const validateAdminRegistration = joiObject<I_Admin>({
  _id: Validators.mongoIdValidator(),
  email: Joi.string().email().required(),
  username: Validators.validateUsername()
    .message('Invalid username')
    .required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  userType: Joi.string().valid(...Object.values(UserType)),
  collegeId: Validators.mongoIdValidator(),
});

export const validateUserLogin = joiObject({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userType: Joi.string()
    .valid(...Object.values(UserType))
    .required(),
});

export const checkUserExistsValidationQuery = joiObject({
  username: Validators.validateUsername().message('Invalid username'),
  email: Joi.string().email(),
});
export const validateForgotPasswordQuery = joiObject({
  email: Joi.string().email().required(),
});
export const validateResetPasswordQuery = joiObject({
  otpToken: Joi.string().required(),
});
export const validateResetPasswordBody = joiObject({
  otp: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export * as authValidator from './auth.validator';
