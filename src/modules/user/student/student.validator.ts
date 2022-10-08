import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../shared/validators/validators';

export const validateStudentByIdParam = joiObject({
  studentId: Validators.mongoIdValidator().required(),
});

export const validateAllStudentsinClassQuery = joiObject({
  classId: Validators.mongoIdValidator(),
  collegeId: Validators.mongoIdValidator(),
});

