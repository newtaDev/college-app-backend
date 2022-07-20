import { UserType } from '../../utils/enums';

export interface I_CreatedBy {
  name: string;
  userId: string;
  userType: UserType;
}
export interface I_AssignedBy extends I_CreatedBy {}
export interface I_ClassAssignedTo extends I_CreatedBy {}
export interface I_LastModifiedBy extends I_CreatedBy {}
