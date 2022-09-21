/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from 'mongoose';

const classes = [
  {
    _id: new Types.ObjectId('6329e1199836e911caa707e4'),
    students: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
  {
    _id: new Types.ObjectId('632a74d30fd0869b18c6a248'),
    students: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
  {
    _id: new Types.ObjectId('632a7576b33b39c7aba88f70'),
    students: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
  {
    _id: new Types.ObjectId('632a758323c6fd88aa4242a5'),
    students: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
];

const courses = [
  {
    _id: new Types.ObjectId('6329e13742e52873c16c74e0'),
    subjects: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classes: classes,
  },
];
export const collegeIds = [
  {
    _id: new Types.ObjectId('62fa474944d6a2d5d3597ab7'),
    teachers: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    faculty: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    courses: courses,
  },
];

export const superAdminIds = [
  new Types.ObjectId('62fa471eb755fd8c120b98df'),
  new Types.ObjectId('62fa472b50d1dc4f31e104af'),
];

export const adminIds = [
  new Types.ObjectId('62fa474944d6a2d5d3597ab5'),
  new Types.ObjectId('62fa474944d6a2d5d3597ab6'),
];
