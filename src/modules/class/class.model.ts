// Model and schema for Class

import { Schema } from 'mongoose';
import {
  I_ClassAssignedTo,
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Class {
  name: string;
  classNumber: number;
  collegeId: string; //TODO: convert to mongo id
  assignedTo: I_ClassAssignedTo;
  createdBy?: I_CreatedBy;
  lastModifiedBy?: I_LastModifiedBy;
}
const _createdOrModifiedBy = {
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
};

export const classSchema = new Schema<I_Class>(
  {
    name: { type: String, required: true },
    classNumber: { type: Number, required: true },
    collegeId: { type: String, required: true },
    assignedTo: { type: _createdOrModifiedBy, required: true },
    createdBy: { type: _createdOrModifiedBy, required: false },
    lastModifiedBy: { type: _createdOrModifiedBy, required: false },
  },
  { timestamps: true }
);
