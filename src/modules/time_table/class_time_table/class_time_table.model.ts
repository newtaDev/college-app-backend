import { Validators } from '../../../utils/validators';
import { Schema, Types, ValidatorProps } from 'mongoose';
import { I_CreatedBy } from '../../../shared/interfaces/interfaces';
import { UserType, Week } from '../../../utils/enums';
import { Teacher } from '../../user/teacher.model';
import db from '../../../config/database/db';
import { Subject } from '../../subject/subject.model';
import { Class } from '../../class/class.model';
import { College } from '../../college/college.model';
export interface I_ClassTimeTable {
  subjectId: Types.ObjectId;
  classId: Types.ObjectId;
  collegeId: Types.ObjectId;
  teacherId: Types.ObjectId;
  startingTime: string;
  endingTime: string;
  week: Week;
  createdBy?: I_CreatedBy;
}

const _createdBy = {
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
      type: Types.ObjectId,
      required: true,
    },
  },
};

export const classTimeTableSchema = new Schema<I_ClassTimeTable>(
  {
    subjectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Subject(),
    },
    classId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Class(),
    },
    collegeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: College(),
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Teacher(),
    },
    endingTime: {
      type: String,
      required: true,
      validate: {
        validator: Validators.is24HoursTime,
        message: (props: ValidatorProps) =>
          `${props.value} is not valid Time! ex: 07:20 or ex: 18:10`,
      },
    },
    startingTime: {
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
    createdBy: _createdBy,
  },
  { timestamps: true }
);

export const ClassTimeTable = () =>
  db.college.model<I_ClassTimeTable>('ClassTimeTable', classTimeTableSchema);
