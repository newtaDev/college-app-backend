import { Types } from 'mongoose';

export interface I_CreatedBy {
  name: string;
  userId: Types.ObjectId;
}
export interface I_AssignedBy extends I_CreatedBy {}
export interface I_ClassAssignedTo extends I_CreatedBy {}
export interface I_LastModifiedBy extends I_CreatedBy {}
