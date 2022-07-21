// Model and schema for Course

import { Schema } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Course {
  name: string;
  collegeId: string; //TODO: convert to mongo id
  mainSubjectIds: string[]; //TODO: convert to mongo id
  optionalSubjectIds: string[]; //TODO: convert to mongo id
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
      type: String,
      required: true,
    },
  },
  required: false,
};

export const courseSchema = new Schema<I_Course>(
  {
    name: { type: String, required: true },
    collegeId: { type: String, required: true },
    mainSubjectIds: {
      type: [String], //TODO convert to mongo Id
      default: [],
      required: true,
    },
    optionalSubjectIds: {
      type: [String], //TODO convert to mongo Id
      default: [],
      required: false,
    },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);
