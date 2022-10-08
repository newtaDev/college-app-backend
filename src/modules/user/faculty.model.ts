import mongoose, { Model, Schema, Types, ValidatorProps } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '../../utils/enums';
import { facultyUsersList, FacultyUserTypes } from '../../utils/roles';
import { docHooks, queryHooks } from '../../utils/mongoose';
import logger from '../../utils/logger';
import { Validators } from '../../shared/validators/validators';

export interface I_Faculty {
  name: string;
  email: string;
  username: string;
  password: string;
  collegeId: Types.ObjectId;
  userType: FacultyUserTypes;
  isTestData?: boolean;
}
interface I_FacultyMethods {
  isPasswordValid(password: string): Promise<boolean>;
}
export type FacultyModel = Model<I_Faculty, unknown, I_FacultyMethods>;

export const facultySchema = new Schema<
  I_Faculty,
  FacultyModel,
  I_FacultyMethods
>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: Validators.isValidEmail,
        message: (props: ValidatorProps) => `${props.value} is not valid email`,
      },
    },
    username: {
      type: String,
      unique: true,
      validate: {
        validator: Validators.isValidUsername,
        message: (props: ValidatorProps) =>
          `${props.value} is not valid username`,
      },
    },
    password: { type: String, required: true,select:false },
    collegeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'College',
    },
    userType: {
      type: String,
      enum: facultyUsersList,
      default: UserType.staff,
      required: true,
    },
    isTestData: { type: Boolean, select: false, default: false },
  },
  { timestamps: true }
);

facultySchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

facultySchema.pre(queryHooks, async function (next) {
  const _password = this.get('password');
  if (!_password) return next();
  logger.debug('--- Query: Password encrypted -- ');

  // 10 is salt
  const hashedPassword = await bcrypt.hash(_password, 10);
  this.update({}, { password: hashedPassword });
  return next();
});

facultySchema.pre(docHooks, async function (next) {
  if (!this.isModified('password')) {
    return;
  }
  logger.debug(`--- Doc(${this.$op}): Password encrypted -- `);
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  return;
});
export const Faculty = mongoose.model<I_Faculty, FacultyModel>(
  'Faculty',
  facultySchema
);
