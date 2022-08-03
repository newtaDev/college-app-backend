import test_ids from './test_ids';

const createCollege1Payload = {
  _id: test_ids.collgeId1,
  name: 'Scared Heart',
  email: 'emailId@gmail.com',
  mobile: 8374837,
  website: 'www.college.com',
  address: 'Addres of the specified collge will be here',
  description: 'description of the specified college wwill be here',
};
const createCollege2Payload = {
  _id: test_ids.collgeId2,
  name: 'Scared Heart 2',
  email: 'emailId2@gmail.com',
  mobile: 8374837,
  website: 'www.college2.com',
  address: 'Addres of the specified collge will be here',
  description: 'description of the specified college wwill be here',
};

const createAdmin1 = {
  name: 'Newta',
  email: 'newta.admin@gmail.com',
  password: 'Newta1234',
};

const createTeacher1 = {
  name: 'Newta',
  email: 'newta.teacher@gmail.com',
  password: 'Newta1234',
  collegeId: test_ids.collgeId1,
};
export default {
  createCollege1Payload,
  createCollege2Payload,
  createAdmin1,
  createTeacher1,
};
