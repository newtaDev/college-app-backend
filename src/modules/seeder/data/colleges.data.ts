import { Types } from 'mongoose';
import { I_College } from '../../college/college.model';
import idsData from './ids.data';

export const importCollegeData: (I_College & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: idsData.collegeIds[0],
    name: 'Scared Heart 0',
    email: 'emailIdshc0@gmail.com',
    mobile: 8374837,
    website: 'www.college.com',
    address: 'Addres of the specified collge will be here',
    description: 'description of the specified college wwill be here',
  },
  {
    _id: idsData.collegeIds[1],
    name: 'Scared Heart 1',
    email: 'emailIdshc1@gmail.com',
    mobile: 8374837,
    website: 'www.college.com',
    address: 'Addres of the specified collge will be here',
    description: 'description of the specified college wwill be here',
  },
];
