// Model and schema for Course

import mongoose, { Types, Schema } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Course {
  name: string;
  collegeId: Types.ObjectId;
  totalSem: number;
  createdBy?: I_CreatedBy;
  lastModifiedBy?: I_LastModifiedBy;
}
const _createdOrModifiedBy = {
  type: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  required: false,
};

export const courseSchema = new Schema<I_Course>(
  {
    name: { type: String, required: true },
    collegeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'College',
    },
    totalSem: { type: Number, required: true },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);

export const Course = mongoose.model<I_Course>('Course', courseSchema);
