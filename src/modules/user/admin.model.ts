import mongoose, { Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';
import { adminUsersList, AdminUserTypes } from '../../utils/roles';
import { College } from '../college/college.model';
import { docHooks, queryHooks } from '../../utils/mongoose';
import logger from '../../utils/logger';

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

adminSchema.pre(queryHooks, async function (next) {
  const _password = this.get('password');
  if (!_password) return next();
  logger.debug('--- Query: Password encrypted -- ');

  // 10 is salt
  const hashedPassword = await bcrypt.hash(_password, 10);
  this.update({}, { password: hashedPassword });
  return next();
});

adminSchema.pre(docHooks, async function (next) {
  if (!this.isModified('password')) {
    return;
  }
  logger.debug(`--- Doc(${this.$op}): Password encrypted -- `);
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  return;
});
export const Admin = mongoose.model<I_Admin, AdminModel>('Admin', adminSchema);
