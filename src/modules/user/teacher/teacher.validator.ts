import Joi from 'joi';
import { joiObject } from '../../../shared/helpers/joi.helper';
import { Validators } from '../../../shared/validators/validators';
import { AccessibleClassScope } from '../../../utils/enums';

export const validateTeacherByIdParam = joiObject({
  teacherId: Validators.mongoIdValidator().required(),
});

export const validateAllTeachersQuery = joiObject({
  collegeId: Validators.mongoIdValidator(),
});

export const validateUpdateteacherBody = joiObject({
  accessibleClasseScope: Joi.string()
    .valid(...Object.values(AccessibleClassScope))
}).unknown();
