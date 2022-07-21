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
  static mongoIdValidator(msg?: string) {
    return Joi.string()
      .custom(isValidMongoId)
      .message(msg ?? '{{#label}} is invalid (Invalid mongo id)');
  }
  static is24HoursTime(value: string): boolean {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
  }
}
