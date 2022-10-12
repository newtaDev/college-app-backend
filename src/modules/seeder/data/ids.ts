/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from 'mongoose';
import { bcaClasses, bcomClasses, bTechClasses } from './class.data';


const courses = [
  {
    _id: new Types.ObjectId('6329e13742e52873c16c74e0'),
    name: 'BCA',
    classes: bcaClasses,
  },
  {
    _id: new Types.ObjectId('633afdf20481f5c35b971dad'),
    name: 'Bcom',
    classes: bcomClasses,
  },
  {
    _id: new Types.ObjectId('63460b1ce7011286dcbb87f8'),
    name: 'BTech',
    classes: bTechClasses,
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
