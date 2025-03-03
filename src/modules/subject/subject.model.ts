// Model and schema for Subject

import mongoose, { Schema, Types } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Subject {
  name: string;
  collegeId: Types.ObjectId;
  courseId: Types.ObjectId;
  classId: Types.ObjectId;
  assignedTo: Types.ObjectId;
  semester: number;
  isMainSubject: boolean;
  createdBy?: I_CreatedBy;
  lastModifiedBy?: I_LastModifiedBy;
  isTestData?: boolean;
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
    classId: { type: Schema.Types.ObjectId, required: true, ref: 'Class' },
    assignedTo: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
    semester: { type: Number, required: true },
    isMainSubject: { type: Boolean, required: true, default: true },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
    isTestData: { type: Boolean, select: false, default: false },
  },
  { timestamps: true }
);

export const Subject = mongoose.model<I_Subject>('Subject', subjectSchema);
