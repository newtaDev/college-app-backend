// Model and schema for College

import { Schema } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { UserType } from '../../utils/enums';

export interface I_College {
  name: string;
  email: string;
  landPhone?: number;
  mobile: number;
  website: string;
  address: string;
  description: string;
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

export const collegeSchema = new Schema<I_College>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    landPhone: { type: Number },
    mobile: { type: Number, required: true },
    website: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);
