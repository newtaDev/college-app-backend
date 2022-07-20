import { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';
import { studentUsersList, StudentUserTypes } from '../../utils/roles';

export interface I_Student {
  name: string;
  email: string;
  password: string;
  userType: StudentUserTypes;
  collegeId: string; //TODO: convert to mongo id
  courseId: string; //TODO: convert to mongo id
  classId: string; //TODO: convert to mongo id
  mySubjectIds: string[];
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
    collegeId: { type: String, required: true },
    courseId: { type: String, required: true },
    classId: { type: String, required: true },
    userType: {
      type: String,
      enum: studentUsersList,
      default: UserType.student,
      required: true,
    },
    mySubjectIds: {
      type: [String], //TODO convert to mongo Id
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

studentSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
