import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../utils/validators';

export const validateTeacherByIdParam = joiObject({
  teacherId: Validators.mongoIdValidator().required(),
});

export const validateAllTeachersQuery = joiObject({
  collegeId: Validators.mongoIdValidator(),
});
