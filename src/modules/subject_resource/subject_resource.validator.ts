import Joi from 'joi';
import { joiObject } from '../../shared/helpers/joi.helper';
import { Validators } from '../../shared/validators/validators';
import { UserType } from '../../utils/enums';
import { I_SubjectResource, I_SubjectResourceComment } from './subject_resource.model';

export const validateSubjectResourceByIdParam = joiObject({
  resourceId: Validators.mongoIdValidator().required(),
});
export const validateSubjectSubjectResourceQuery = joiObject({
  subjectId: Validators.mongoIdValidator().required(),
});
export const validateDeleteCommentByIdParam = joiObject({
  resourceId: Validators.mongoIdValidator().required(),
  commentId: Validators.mongoIdValidator().required(),
});
export const validateCreateBody = joiObject<I_SubjectResource>({
  _id: Validators.mongoIdValidator(),
  subjectId: Validators.mongoIdValidator().required(),
  collegeId: Validators.mongoIdValidator(),
  userId: Validators.mongoIdValidator().required(),
  title: Joi.string().required(),
  description: Joi.string(),
});

export const validateCommentBody = joiObject<I_SubjectResourceComment>({
  userId: Validators.mongoIdValidator().required(),
  comment: Joi.string().required(),
  userType: Joi.string()
    .valid(...Object.values(UserType))
    .required(),
});
export const validateCreateFormData = joiObject<I_SubjectResource>({
  attachments: Joi.array().items(Validators.validFile()),
});

export * as subjectPostValidator from './subject_resource.validator';
