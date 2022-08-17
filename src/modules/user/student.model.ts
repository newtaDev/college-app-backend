import { Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';
import { studentUsersList, StudentUserTypes } from '../../utils/roles';
import db from '../../config/database/db';
import { College } from '../college/college.model';
import { Class } from '../class/class.model';
import { Subject } from '../subject/subject.model';

export interface I_Student {
  name: string;
  email: string;
  password: string;
  userType: StudentUserTypes;
  collegeId: Types.ObjectId;
  classId: Types.ObjectId;
  mySubjectIds: Types.ObjectId[];
}

interface I_StudentMethods {
  isPasswordValid(password: string): Promise<boolean>;
}
export type StudentModel = Model<I_Student, unknown, I_StudentMethods>;

export const studentSchema = new Schema<
  I_Student,
  StudentModel,
  I_StudentMethods
>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: College(),
    },
    classId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Class(),
    },
    userType: {
      type: String,
      enum: studentUsersList,
      default: UserType.student,
      required: true,
    },
    mySubjectIds: {
      type: [Schema.Types.ObjectId],
      default: [],
      required: true,
      ref: Subject(),
    },
  },
  { timestamps: true }
);

studentSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
/// replaced [save] hook with [validate]
/// Runs on insertMany,save .....
/// Not on update
studentSchema.pre('validate', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export const Student = () =>
  db.user.model<I_Student, StudentModel>('Student', studentSchema);
