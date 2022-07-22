// Model and schema for Subject

import { Schema, Types } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Subject {
  name: string;
  collegeId: Types.ObjectId;
  courseId: Types.ObjectId;
  isMainSubject: boolean;
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

export const subjectSchema = new Schema<I_Subject>(
  {
    name: { type: String, required: true },
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: 'College' },
    courseId: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
    isMainSubject: { type: Boolean, required: true, default: true },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);
