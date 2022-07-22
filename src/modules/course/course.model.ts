// Model and schema for Course

import { Types, Schema } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Course {
  name: string;
  collegeId: Types.ObjectId;
  mainSubjectIds?: Types.ObjectId[];
  optionalSubjectIds?: Types.ObjectId[];
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
    mainSubjectIds: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Subject',
    },
    optionalSubjectIds: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Subject',
    },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);
