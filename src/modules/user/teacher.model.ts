import { Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';
import { teacherUsersList, TeacherUserTypes } from '../../utils/roles';
import { collegeDb } from '../../config/database/college.db';

export interface I_Teacher {
  name: string;
  email: string;
  password: string;
  collegeId: Types.ObjectId;
  userType: TeacherUserTypes;
}
interface I_TeacherMethods {
  isPasswordValid(password: string): Promise<boolean>;
}
export type TeacherModel = Model<I_Teacher, unknown, I_TeacherMethods>;

export const teacherSchema = new Schema<
  I_Teacher,
  TeacherModel,
  I_TeacherMethods
>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: {
      type: Schema.Types.ObjectId,
      ref: collegeDb.College,
      required: true,
    },
    userType: {
      type: String,
      enum: teacherUsersList,
      default: UserType.teacher,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

teacherSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
