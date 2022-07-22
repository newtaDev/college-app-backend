// Model and schema for Class

import { Schema, Types } from 'mongoose';
import {
  I_ClassAssignedTo,
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

export interface I_Class {
  name: string;
  classNumber: number;
  collegeId: Types.ObjectId;
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
    type: Schema.Types.ObjectId,
    required: true,
  },
};

export const classSchema = new Schema<I_Class>(
  {
    name: { type: String, required: true },
    classNumber: { type: Number, required: true },
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: 'College' },
    assignedTo: { type: _createdOrModifiedBy, required: true },
    createdBy: { type: _createdOrModifiedBy, required: false },
    lastModifiedBy: { type: _createdOrModifiedBy, required: false },
  },
  { timestamps: true }
);
