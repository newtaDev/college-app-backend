import mongoose, { Model, Schema, Types, ValidatorProps } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../../utils/enums';
import { teacherUsersList, TeacherUserTypes } from '../../../utils/roles';
import { docHooks, queryHooks } from '../../../utils/mongoose';
import logger from '../../../utils/logger';
import { Validators } from '../../../shared/validators/validators';

export interface I_Teacher {
  name: string;
  username?: string;
  email?: string;
  password: string;
  emoji?: string;
  bio?: string;
  collegeId: Types.ObjectId;
  accessibleClasses: Types.ObjectId[];
  userType: TeacherUserTypes;
  phoneNumber?: number;
  currentAddress?: number;
  dob: Date;
  isProfileCompleted?: boolean;
  isTestData?: boolean;
}
export interface I_TeacherMethods {
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
    email: {
      type: String,
      validate: {
        validator: Validators.isValidEmail,
        message: (props: ValidatorProps) => `${props.value} is not valid email`,
      },
    },
    password: { type: String, required: true, select: false },
    emoji: { type: String },
    bio: { type: String },
    collegeId: {
      type: Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    userType: {
      type: String,
      enum: teacherUsersList,
      default: UserType.teacher,
      required: true,
    },
    accessibleClasses: {
      type: [Schema.Types.ObjectId],
      default: [],
      required: true,
      ref: 'Class',
    },
    phoneNumber: Number,
    currentAddress: String,
    dob: { type: Date, required: true },
    username: {
      type: String,
      validate: {
        validator: Validators.isValidUsername,
        message: (props: ValidatorProps) =>
          `${props.value} is not valid username`,
      },
    },
    isProfileCompleted: { type: Boolean, default: false },
    isTestData: { type: Boolean, select: false, default: false },
  },
  {
    timestamps: true,
  }
);
/// If email/username is not empty then checks for duplicate value
/// If email/username is null then doest check for duplicate and creates a new document
teacherSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $exists: true },
    },
  }
);
teacherSchema.index(
  { username: 1 },
  {
    unique: true,
    partialFilterExpression: {
      username: { $exists: true },
    },
  }
);

teacherSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

teacherSchema.pre(queryHooks, async function (next) {
  const _password = this.get('password');
  if (!_password) return next();
  logger.debug('--- Query: Password encrypted -- ');

  // 10 is salt
  const hashedPassword = await bcrypt.hash(_password, 10);
  this.update({}, { password: hashedPassword });
  return next();
});

teacherSchema.pre(docHooks, async function (next) {
  if (!this.isModified('password')) {
    return;
  }
  logger.debug(`--- Doc(${this.$op}): Password encrypted -- `);
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  return;
});
export const Teacher = mongoose.model<I_Teacher, TeacherModel>(
  'Teacher',
  teacherSchema
);
