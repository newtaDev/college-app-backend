import { joiObject } from '../../../shared/helpers/joi.helper';
import { Validators } from '../../../shared/validators/validators';

export const validateTeacherByIdParam = joiObject({
  teacherId: Validators.mongoIdValidator().required(),
});

export const validateAllTeachersQuery = joiObject({
  collegeId: Validators.mongoIdValidator(),
});
