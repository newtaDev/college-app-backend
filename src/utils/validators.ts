import { isValidMongoId } from '../shared/functions/mongo_id_validator';
import Joi from 'joi';
import { joiObject } from './helpers';

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

  static isValidEmail(value: string): boolean {
    //eslint-disable-next-line
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      value
    );
  }
  static isValidUsername(value: string): boolean {
    const regx = new RegExp('^((?![.])(?!.*[.]{2})[a-z0-9_.]{3,20})[a-z0-9_]$');
    return regx.test(value);
    /*
   ^((?![.])(?!.*[.]{2})[a-z0-9_.]{3,20})[a-z0-9_]$'
   └───┬───┘ └───┬-----┘└──┬────┘ └─┬──┘ └───┬──┘
       │         │         │        │         Should not end with . or special chars
       │         │         │        │
       │         │         │        Min 3 chars Max 20 Chars
       │         │         │
       │         │         Can contains lowercase letters,numbers and . 
       │         │
       │         should not contain mutliple . inside
       │
       should not start with . 
  
    */
  }
  static validateUsername() {
    return Joi.string().custom(val => {
      if (!this.isValidUsername(val)) throw new Error('Invalid username');
      return val;
    });
  }
  static validate24HoursTime() {
    return Joi.string().custom(val => {
      if (!this.is24HoursTime(val)) throw new Error('Invalid Time');
      return val;
    });
  }
  static validImage() {
    const imageFormats = ['image/jpeg'];
    return joiObject({
      mimetype: Joi.string().valid(...Object.values(imageFormats)),
    }).unknown();
  }
}
