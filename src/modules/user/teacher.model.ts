import { Model, Schema, ValidatorProps } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType, Week } from '../../utils/enums';
import { I_AssignedBy } from '../../shared/interfaces/interfaces';
import { Validators } from '../../utils/validators';
import { teacherUsersList, TeacherUserTypes } from '../../shared/types/roles';

interface I_AssignedOn {
  time: string;
  week: Week;
}
interface I_AssignedClasses {
  subjectId: string; //TODO: convert to mongo id
  classId: string; //TODO: convert to mongo id
  assignedOn: I_AssignedOn;
  assignedBy?: I_AssignedBy;
}

const _assignedOn = {
  type: {
    time: {
      type: String,
      required: true,
      validate: {
        validator: Validators.is24HoursTime,
        message: (props: ValidatorProps) =>
          `${props.value} is not valid Time! ex: 07:20 or ex: 18:10`,
      },
    },
    week: {
      type: String,
      enum: Week,
      required: true,
    },
  },
  required: true,
};

const _assignedBy = {
  type: {
    userType: {
      type: String,
      enum: UserType,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  required: true,
};

export interface I_Teacher {
  name: string;
  email: string;
  password: string;
  collegeId: string; //TODO: convert to mongo id
  userType: TeacherUserTypes;
  assignedClasses: I_AssignedClasses[];
}
interface I_TeacherMethods {
  isPasswordValid(password: string): Promise<boolean>;
}
export type TeacherModel = Model<I_Teacher, unknown, I_TeacherMethods>;

/// Mongoos schemas
const assignedClassesSchema = new Schema<I_AssignedClasses>(
  {
    subjectId: { type: String, required: true },
    classId: { type: String, required: true },
    assignedOn: _assignedOn,
    assignedBy: _assignedBy,
  },
  { timestamps: true }
);
export const teacherSchema = new Schema<
  I_Teacher,
  TeacherModel,
  I_TeacherMethods
>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: { type: String, required: true },
    userType: {
      type: String,
      enum: teacherUsersList,
      default: UserType.teacher,
      required: true,
    },
    assignedClasses: [assignedClassesSchema],
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
