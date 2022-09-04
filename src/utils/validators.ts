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
  static restrictUpdatingCollegeId() {
    return Joi.string()
      .custom(val => {
        if (val.length >= 0) throw Error('You Cannot update collgeId');
      })
      .message('Updating {{#label}} is restricted');
  }
  static validateUsername() {
   return  Joi.string()
    .min(4)
    .max(20)
    .pattern(new RegExp('^(?![0-9_])(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'))
  /*
    ^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
   └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
         │         │         │            │           no _ or . at the end
         │         │         │            │
         │         │         │            allowed characters
         │         │         │
         │         │         no __ or _. or ._ or .. inside
         │         │
         │         no _ or . at the beginning
         │
         username is 4-20 characters long
  
    */
  }
}
