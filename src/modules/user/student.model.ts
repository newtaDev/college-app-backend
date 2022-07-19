import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';

export interface I_Student {
  name: string;
  email: string;
  password: string;
  userType: UserType.student;
  collegeId: string; //TODO: convert to mongo id
  courseId: string; //TODO: convert to mongo id
  classId: string; //TODO: convert to mongo id
  mySubjectIds: string[];
  isPasswordValid?(password: string): Promise<boolean>;
}

export const studentSchema = new Schema<I_Student>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: { type: String, required: true },
    courseId: { type: String, required: true },
    classId: { type: String, required: true },
    userType: {
      type: String,
      enum: [UserType.student],
      default: UserType.student,
      required: true,
    },
    mySubjectIds: {
      type: [String], //TODO convert to mongo Id
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
