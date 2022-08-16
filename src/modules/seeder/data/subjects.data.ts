import { Types } from 'mongoose';
import { I_Subject } from '../../subject/subject.model';
import idsData from './ids.data';

export const importSubjectData: (I_Subject & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: idsData.subjectIds[0],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[0],
    isMainSubject: true,
    name: 'Data Structures',
  },
  {
    _id: idsData.subjectIds[1],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[0],
    isMainSubject: true,
    name: 'Algorithms',
  },
  {
    _id: idsData.subjectIds[2],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[0],
    isMainSubject: true,
    name: 'COA',
  },
  {
    _id: idsData.subjectIds[3],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[0],
    isMainSubject: true,
    name: 'C',
  },
  {
    _id: idsData.subjectIds[4],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[0],
    isMainSubject: true,
    name: 'C++',
  },
  /// Diff course
  {
    _id: idsData.subjectIds[5],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[1],
    isMainSubject: true,
    name: 'History',
  },
  {
    _id: idsData.subjectIds[6],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[1],
    isMainSubject: true,
    name: 'English',
  },
  {
    _id: idsData.subjectIds[7],
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[1],
    isMainSubject: true,
    name: 'Hindi',
  },
  /// Diff College
  {
    _id: idsData.subjectIds[8],
    collegeId: idsData.collegeIds[1],
    courseId: idsData.coursesIds[1],
    isMainSubject: true,
    name: 'Vb.net',
  },
  {
    _id: idsData.subjectIds[9],
    collegeId: idsData.collegeIds[1],
    courseId: idsData.coursesIds[0],
    isMainSubject: true,
    name: 'Economics',
  },
];
