import { Types } from 'mongoose';
import { UserType } from '../../utils/enums';

export interface I_CreatedBy {
  name: string; //TODO: remove; because name could be updated
  userType: UserType
  userId: Types.ObjectId;
}
export interface I_AssignedBy extends I_CreatedBy {}
export interface I_ClassAssignedTo extends I_CreatedBy {}
export interface I_LastModifiedBy extends I_CreatedBy {}
