// Model and schema for College

import { Schema, Types, ValidatorProps } from 'mongoose';
import db from '../../config/database/db';
import { College } from '../college/college.model';
import { Subject } from '../subject/subject.model';

import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { Class } from '../class/class.model';
import { Validators } from '../../utils/validators';

export interface I_Attendance {
  collegeId: Types.ObjectId;
  classId: Types.ObjectId;
  subjectId: Types.ObjectId;
  absentStudents: Types.ObjectId[];
  classStartTime: string;
  classEndTime: string;
  currentSem: number;
  createdBy?: I_CreatedBy;
  createdAt?: Date;
  lastModifiedBy?: I_LastModifiedBy;
}
const _createdOrModifiedBy = {  
  type: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  required: false,
};

export const attenadanceSchema = new Schema<I_Attendance>(
  {
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: College() },
    classId: { type: Schema.Types.ObjectId, required: true, ref: Class() },
    subjectId: { type: Schema.Types.ObjectId, required: true, ref: Subject() },
    classStartTime: {
      type: String,
      required: true,
      validate: {
        validator: Validators.is24HoursTime,
        message: (props: ValidatorProps) =>
          `${props.value} is not valid Time! ex: 07:20 or ex: 18:10`,
      },
    },
    classEndTime: {
      type: String,
      required: true,
      validate: {
        validator: Validators.is24HoursTime,
        message: (props: ValidatorProps) =>
          `${props.value} is not valid Time! ex: 07:20 or ex: 18:10`,
      },
    },
    absentStudents: {
      type: [Schema.Types.ObjectId],
      default: [],
      required: true,
      ref: Subject(),
    },
    currentSem: {
      type: Number,
      rewuired: true,
    },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);

export const Attendance = () =>
  db.college.model<I_Attendance>('Attendance', attenadanceSchema);
