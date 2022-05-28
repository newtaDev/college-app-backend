import { isValidMongoId } from '../shared/functions/mongo_id_validator';
import Joi from 'joi';

// contains basic validations
export class Validators {
  static emailValidator() {
    //TODO
  }
  static passwordValidator() {
    //TODO
  }
  static confirmPasswordValidator() {
    //TODO
  }
  static phoneNumValidator() {
    //TODO
  }
  static dobValidator() {
    //TODO
  }
  static mongoIdValidator() {
    return Joi.string().custom(isValidMongoId).message('Invalid Mongo Id');
  }
}
