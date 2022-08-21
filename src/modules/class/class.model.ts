// Model and schema for Class

import mongoose, { Schema, Types } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

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
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: 'College' },
    courseId: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
    batch: { type: Number, required: true },
    isCollegeCompleted: { type: Boolean, required: true, default: false },
    currentSem: { type: Number, required: true },
    assignedToId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Teacher',
    },
    createdBy: { type: _createdOrModifiedBy, required: false },
    lastModifiedBy: { type: _createdOrModifiedBy, required: false },
  },
  { timestamps: true }
);
export const Class = mongoose.model<I_Class>('Class', classSchema);
