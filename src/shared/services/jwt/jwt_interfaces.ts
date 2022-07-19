import { UserType } from '../../../utils/enums';

export interface I_JwtUserPayload {
  id: string;
  name: string;
  userType: UserType;
}
