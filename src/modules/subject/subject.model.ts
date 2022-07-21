// Model and schema for Subject

import { Schema } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Subject {
  name: string;
  collegeId: string; //TODO: convert to mongo id
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

export const subjectSchema = new Schema<I_Subject>(
  {
    name: { type: String, required: true },
    collegeId: { type: String, required: true },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);
