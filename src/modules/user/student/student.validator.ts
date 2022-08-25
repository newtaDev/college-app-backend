import { joiObject } from '../../../utils/helpers';
import { Validators } from '../../../utils/validators';

export const validateStudentByIdParam = joiObject({
  studentId: Validators.mongoIdValidator().required(),
});
