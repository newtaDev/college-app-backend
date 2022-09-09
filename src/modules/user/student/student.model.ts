import mongoose, {
  Model,
  Query,
  Schema,
  Types,
  ValidatorProps,
} from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../../utils/enums';
import { studentUsersList, StudentUserTypes } from '../../../utils/roles';
import logger from '../../../utils/logger';
import { docHooks, queryHooks } from '../../../utils/mongoose';
import { Validators } from '../../../utils/validators';

export interface I_Student {
  name: string;
  emoji?: string;
  bio?: string;
  username?: string;
  email?: string;
  password: string;
  userType: StudentUserTypes;
  collegeId: Types.ObjectId;
  classId: Types.ObjectId;
  phoneNumber?: number;
  parentsNumber?: number;
  currentAddress?: number;
  dob: Date;
  myOptionalSubjects: Types.ObjectId[];
  isProfileCompleted?: boolean;
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
    email: {
      type: String,
      validate: {
        validator: Validators.isValidEmail,
        message: (props: ValidatorProps) => `${props.value} is not valid email`,
      },
    },
    password: { type: String },
    emoji: { type: String },
    bio: { type: String },
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
    myOptionalSubjects: {
      type: [Schema.Types.ObjectId],
      default: [],
      required: true,
      ref: 'Subject',
    },
    phoneNumber: Number,
    currentAddress: String,
    dob: { type: Date, required: true },
    parentsNumber: Number,
    username: {
      type: String,
      validate: {
        validator: Validators.isValidUsername,
        message: (props: ValidatorProps) =>
          `${props.value} is not valid username`,
      },
    },
    isProfileCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
/// If email/username is not empty then checks for duplicate value
/// If email/username is null then doest check for duplicate and creates a new document
studentSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $exists: true },
    },
  }
);
studentSchema.index(
  { username: 1 },
  {
    unique: true,
    partialFilterExpression: {
      username: { $exists: true },
    },
  }
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
