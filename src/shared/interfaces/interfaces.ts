import { UserType } from '../../utils/enums';

export interface I_AssignedBy {
  name: string;
  userId: string;
  userType: UserType;
}
