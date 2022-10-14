import { joiObject } from '../../../shared/helpers/joi.helper';
import { Validators } from '../../../shared/validators/validators';

export const validateStudentByIdParam = joiObject({
  studentId: Validators.mongoIdValidator().required(),
});

export const validateAllStudentsinClassQuery = joiObject({
  classId: Validators.mongoIdValidator(),
  collegeId: Validators.mongoIdValidator(),
});

