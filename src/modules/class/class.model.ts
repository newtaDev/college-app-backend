// Model and schema for Class

import { Schema, Types } from 'mongoose';
import db from '../../config/database/db';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { College } from '../college/college.model';
import { Course } from '../course/course.model';
import { Teacher } from '../user/teacher.model';

export interface I_Class {
  name: string;
  classNumber: number;
  currentSem: number; //based on totalSem in course
  batch: number;
  isCollegeCompleted: boolean;
  collegeId: Types.ObjectId;
  courseId: Types.ObjectId;
  assignedToId: Types.ObjectId; // should be teacherId
  createdBy?: I_CreatedBy;
  lastModifiedBy?: I_LastModifiedBy;
}
const _createdOrModifiedBy = {
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
};

export const classSchema = new Schema<I_Class>(
  {
    name: { type: String, required: true },
    classNumber: { type: Number, required: true },
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: College() },
    courseId: { type: Schema.Types.ObjectId, required: true, ref: Course() },
    batch: { type: Number, required: true },
    isCollegeCompleted: { type: Boolean, required: true, default: false },
    currentSem: { type: Number, required: true },
    assignedToId: { type: Schema.Types.ObjectId, required: true, ref: Teacher() },
    createdBy: { type: _createdOrModifiedBy, required: false },
    lastModifiedBy: { type: _createdOrModifiedBy, required: false },
  },
  { timestamps: true }
);
export const Class = () => db.college.model<I_Class>('Class', classSchema);
