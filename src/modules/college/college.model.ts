// Model and schema for College

import { Schema } from 'mongoose';
import db from '../../config/database/db';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';

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
    name: { type: String, required: true, unique: true },
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

export const College = () =>
  db.college.model<I_College>('College', collegeSchema);
