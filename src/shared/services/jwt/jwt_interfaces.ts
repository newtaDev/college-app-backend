import { UserType } from '../../../utils/enums';

export interface I_JwtUserPayload {
  id: string;
  name: string;
  userType: UserType;
  collegeId?: string;
  isAdmin: boolean;
}
export interface I_JwtOtpPayload {
  userId: string;
  userType: UserType;
  otp: string;
}
