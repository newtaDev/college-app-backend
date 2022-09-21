import { Types } from 'mongoose';
import { UserType } from '../../../utils/enums';
import { I_Admin } from '../../user/admin.model';
import { adminIds, superAdminIds } from './ids';

export const importSuperAdminsData: (I_Admin & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: superAdminIds[0],
    name: 'Newta',
    username: 'super_admin_1',
    email: 'newta.super.admin0@gmail.com',
    password: 'Newta1234',
    userType: UserType.superAdmin,
  },
  {
    _id: superAdminIds[1],
    name: 'Newta',
    username: 'super_admin_2',
    email: 'newta.super.admin1@gmail.com',
    password: 'Newta1234',
    userType: UserType.superAdmin,
  },
];
export const importAdminsData: (I_Admin & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: adminIds[0],
    name: 'Newta',
    username: 'admin_1',
    email: 'newta.admin0@gmail.com',
    password: 'Newta1234',
    userType: UserType.admin,
  },
  {
    _id: adminIds[1],
    name: 'Newta',
    username: 'admin_2',
    email: 'newta.admin1@gmail.com',
    password: 'Newta1234',
    userType: UserType.admin,
  },
];
