// Model and schema for Class

import { Schema } from 'mongoose';
import {
  I_ClassAssignedTo,
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { UserType } from '../../utils/enums';

export interface I_Class {
  name: string;
  classNumber: number;
  collegeId: string; //TODO: convert to mongo id
  assignedTo: I_ClassAssignedTo;
  createdBy?: I_CreatedBy;
  lastModifiedBy?: I_LastModifiedBy;
}
const _createdOrModifiedBy = {
  type: {
    userType: {
      type: String,
      enum: UserType,
      required: true,
    },
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

export const classSchema = new Schema<I_Class>(
  {
    name: { type: String, required: true },
    classNumber: { type: Number, required: true },
    collegeId: { type: String, required: true },
    assignedTo: { ..._createdOrModifiedBy, required: true },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);
