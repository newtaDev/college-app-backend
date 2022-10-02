import { Types } from 'mongoose';
import { UserType } from '../../utils/enums';

export interface I_CreatedBy {
  userType: UserType;
  modelName: string;
  userId: Types.ObjectId;
}

export interface I_AssignedBy extends I_CreatedBy {}
export interface I_LastModifiedBy extends I_CreatedBy {}
