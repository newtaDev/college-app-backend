/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from 'mongoose';

const bcaClasses = [
  {
    _id: new Types.ObjectId('6329e1199836e911caa707e4'),
    name: 'BCA',
    students: {
      ids: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
      names: ['Newta', 'James', 'Jobit', 'Cyril', 'Ankith'],
    },
    subjects: {
      ids: Array.from({ length: 3 }, (v, k) => new Types.ObjectId()),
      names: ['English', 'FIT', 'DSA'],
    },
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
  {
    _id: new Types.ObjectId('632a74d30fd0869b18c6a248'),
    name: 'BCA in CS',
    students: {
      ids: Array.from({ length: 8 }, (v, k) => new Types.ObjectId()),
      names: [
        'Jennifer',
        'Natalie',
        'John',
        'Samuel',
        'Jasmine',
        'Patricia',
        'Michael',
        'Elijah',
      ],
    },
    subjects: {
      ids: Array.from({ length: 4 }, (v, k) => new Types.ObjectId()),
      names: ['COA', 'SQL', 'Python programming lab', 'C++ lab'],
    },
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
  {
    _id: new Types.ObjectId('632a7576b33b39c7aba88f70'),
    name: 'BCA in CC',
    students: {
      ids: Array.from({ length: 8 }, (v, k) => new Types.ObjectId()),
      names: [
        'Calista Grainger',
        'Michalina Davidson',
        'Ammaarah Schwartz',
        'Terence Lake',
        'Levison Hills',
        'Izaan Best',
        'Kezia Knott',
        'Sumaya Felix',
      ],
    },
    subjects: {
      ids: Array.from({ length: 4 }, (v, k) => new Types.ObjectId()),
      names: [
        'Graphic designing',
        'CGM',
        'Software testing',
        'Fundamentals of computer',
      ],
    },
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
  {
    _id: new Types.ObjectId('632a758323c6fd88aa4242a5'),
    name: 'BCA in Robotics',
    students: {
      ids: Array.from({ length: 8 }, (v, k) => new Types.ObjectId()),
      names: [
        'Louisa Greenwood',
        'Elspeth Humphrey',
        'Kloe Gaines',
        'Eira Fellows',
        'Kobi Vasquez',
        'Cheyanne Millington',
        'Aalia Dunlop',
        'Kristina Blankenship',
      ],
    },
    subjects: {
      ids: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
      names: ['Data science', 'Machine learning', 'Robotics', 'Python', 'C'],
    },
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
];
const bcomClasses = [
  {
    _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
    name: 'Bcom A',
    students: {
      ids: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
      names: ['Bharat', 'Aryavarta', 'Hindustan', 'Tenjiku', 'Jambudweep'],
    },
    subjects: {
      ids: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
      names: [
        'English',
        'Accounts',
        'Statistics',
        'History',
        'Basics of computer',
      ],
    },
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
  {
    _id: new Types.ObjectId('507f191e810c19729de860ea'),
    name: 'Bcom B',
    students: {
      ids: Array.from({ length: 8 }, (v, k) => new Types.ObjectId()),
      names: [
        'Naya',
        'Kabir',
        'Ishaan',
        'Jai',
        'Inaya',
        'Amar',
        'Navi',
        'Dhruv',
      ],
    },
    subjects: {
      ids: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
      names: [
        'English',
        'Accounts',
        'Statistics',
        'History',
        'Basics of computer',
      ],
    },
    attendances: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
    classTimeTables: Array.from({ length: 5 }, (v, k) => new Types.ObjectId()),
  },
];

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
