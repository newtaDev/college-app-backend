import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';

export interface I_Faculty {
  name: string;
  email: string;
  password: string;
  collegeId: string; //TODO: convert to mongo id
  userType: UserType.staff | UserType.principal;
  isPasswordValid?(password: string): Promise<boolean>;
}

export const facultySchema = new Schema<I_Faculty>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: { type: String, required: true },
    userType: {
      type: String,
      enum: [UserType.staff, UserType.principal],
      default: UserType.staff,
      required: true,
    },
  },
  { timestamps: true }
);

facultySchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

facultySchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
