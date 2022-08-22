import { Types } from 'mongoose';
import { I_Course } from '../../course/course.model';
import idsData from './ids.data';

export const importCourseData: (I_Course & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: idsData.coursesIds[0],
    name: 'BCA',
    collegeId: idsData.collegeIds[0],
    totalSem: 6,
  },
  {
    _id: idsData.coursesIds[1],
    name: 'BA',
    collegeId: idsData.collegeIds[1],
    totalSem: 3,
  },
];
