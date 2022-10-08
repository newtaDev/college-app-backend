import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../shared/validators/validators';

export const validateTeacherByIdParam = joiObject({
  teacherId: Validators.mongoIdValidator().required(),
});

export const validateAllTeachersQuery = joiObject({
  collegeId: Validators.mongoIdValidator(),
});
