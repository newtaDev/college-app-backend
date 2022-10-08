// Model and schema for College

import mongoose, { Schema, Types, ValidatorProps } from 'mongoose';

import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { Validators } from '../../shared/validators/validators';

export interface I_Attendance {
  collegeId: Types.ObjectId;
  classId: Types.ObjectId;
  subjectId: Types.ObjectId;
  absentStudents: Types.ObjectId[];
  classStartTime: string;
  classEndTime: string;
  currentSem: number;
  createdBy?: I_CreatedBy;
  attendanceTakenOn?: Date;
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
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: 'College' },
    classId: { type: Schema.Types.ObjectId, required: true, ref: 'Class' },
    subjectId: { type: Schema.Types.ObjectId, required: true, ref: 'Subject' },
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
      ref: 'Subject',
    },
    attendanceTakenOn: { type: Date, required: true, default: Date.now() },
    currentSem: {
      type: Number,
      required: true,
    },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);

export const Attendance = mongoose.model<I_Attendance>(
  'Attendance',
  attenadanceSchema
);
