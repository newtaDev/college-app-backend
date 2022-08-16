import { Types } from 'mongoose';
import { I_Class } from '../../class/class.model';
import idsData from './ids.data';

export const importClassData: (I_Class & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: idsData.classIds[0],
    name: 'BCA 1st year',
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[0],
    assignedToId: idsData.teacherIds[0],
    batch: 2022,
    classNumber: 129,
    currentSem: 1,
    isCollegeCompleted: false,
  },
  {
    _id: idsData.classIds[1],
    name: 'BA final year',
    collegeId: idsData.collegeIds[0],
    courseId: idsData.coursesIds[1],
    assignedToId: idsData.teacherIds[1],
    batch: 2019,
    classNumber: 149,
    currentSem: 1,
    isCollegeCompleted: false,
  },
];
