import { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';
import { adminUsersList, AdminUserTypes } from '../../utils/roles';

export interface I_Admin {
  name: string;
  email: string;
  userType: AdminUserTypes;
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

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
