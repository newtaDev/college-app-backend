import { Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';
import { adminUsersList, AdminUserTypes } from '../../utils/roles';
import db from '../../config/database/db';
import { College } from '../college/college.model';

export interface I_Admin {
  name: string;
  email: string;
  userType: AdminUserTypes;
  collegeId?: Types.ObjectId;
  password: string;
}
interface I_AdminMethods {
  isPasswordValid(password: string): Promise<boolean>;
}
export type AdminModel = Model<I_Admin, unknown, I_AdminMethods>;

export const adminSchema = new Schema<I_Admin, AdminModel, I_AdminMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: { type: Schema.Types.ObjectId, ref: College },
    userType: {
      type: String,
      enum: adminUsersList,
      default: UserType.admin,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
/// replaced [save] hook with [validate]
/// Runs on insertMany,save .....
/// Not on update
adminSchema.pre('validate', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
export const Admin = () =>
  db.user.model<I_Admin, AdminModel>('Admin', adminSchema);
