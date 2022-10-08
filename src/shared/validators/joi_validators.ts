import { joiObject } from '../../utils/helpers';
import { Validators } from './validators';

export const restrictUpdatingCollegeId = joiObject({
  collegeId: Validators.restrictUpdatingCollegeId(),
}).unknown();
/// [.unknown()] allows to pass any keys in req.body
