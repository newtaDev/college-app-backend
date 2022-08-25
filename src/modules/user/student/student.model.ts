import mongoose, { Model, Query, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../../utils/enums';
import { studentUsersList, StudentUserTypes } from '../../../utils/roles';
import logger from '../../../utils/logger';
import { docHooks, queryHooks } from '../../../utils/mongoose';

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
export type StudentQuery = Query<I_Student, unknown, I_StudentMethods>;

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
      ref: 'College',
    },
    classId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Class',
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
      ref: 'Subject',
    },
  },
  { timestamps: true }
);

studentSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.pre(queryHooks, async function (next) {
  const _password = this.get('password');
  if (!_password) return next();
  logger.debug('--- Query: Password encrypted -- ');

  // 10 is salt
  const hashedPassword = await bcrypt.hash(_password, 10);
  this.update({}, { password: hashedPassword });
  return next();
});

studentSchema.pre(docHooks, async function (next) {
  if (!this.isModified('password')) {
    return;
  }
  logger.debug(`--- Doc(${this.$op}): Password encrypted -- `);
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  return;
});

export const Student = mongoose.model<I_Student, StudentModel>(
  'Student',
  studentSchema
);
