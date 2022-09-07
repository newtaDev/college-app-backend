import { Types } from 'mongoose';
import { UserType } from '../../../utils/enums';
import { I_Admin } from '../../user/admin.model';
import { I_Faculty } from '../../user/faculty.model';
import { I_Student } from '../../user/student/student.model';
import { I_Teacher } from '../../user/teacher/teacher.model';
import ids from './ids.data';

export const importSuperAdminsData: (I_Admin & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: ids.superAdminIds[0],
    name: 'Newta',
    email: 'newta.super.admin0@gmail.com',
    password: 'Newta1234',
    userType: UserType.superAdmin,
  },
  {
    _id: ids.superAdminIds[1],
    name: 'Newta',
    email: 'newta.super.admin1@gmail.com',
    password: 'Newta1234',
    userType: UserType.superAdmin,
  },
];
export const importAdminsData: (I_Admin & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: ids.adminIds[0],
    name: 'Newta',
    email: 'newta.admin0@gmail.com',
    password: 'Newta1234',
    userType: UserType.admin,
  },
  {
    _id: ids.adminIds[1],
    name: 'Newta',
    email: 'newta.admin1@gmail.com',
    password: 'Newta1234',
    userType: UserType.admin,
  },
];
export const importTeachersData: (I_Teacher & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: ids.teacherIds[0],
    name: 'Newta',
    email: 'newta.teacher0@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[0],
    userType: UserType.teacher,
    assignedClasses: [ids.classIds[0], ids.classIds[1]],
    dob: new Date('03-13-1988'),
  },
  {
    _id: ids.teacherIds[1],
    name: 'Newta',
    email: 'newta.teacher1@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[1],
    assignedClasses: [ids.classIds[1]],
    userType: UserType.teacher,
    dob: new Date('08-16-1978'),
  },
];
export const importFacultyData: (I_Faculty & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: ids.facultyIds[0],
    name: 'Newta',
    email: 'newta.principal0@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[0],
    userType: UserType.principal,
  },
  {
    _id: ids.facultyIds[1],
    name: 'Newta',
    email: 'newta.staff0@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[1],
    userType: UserType.staff,
  },
];
export const importStudentsData: (I_Student & {
  _id: Types.ObjectId;
})[] = [
  {
    _id: ids.studentIds[0],
    name: 'Newta',
    email: 'newta.student0@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[0],
    userType: UserType.student,
    classId: ids.classIds[0],
    myOptionalSubjects: [],
    dob: new Date('08-16-2000'),
  },
  {
    _id: ids.studentIds[1],
    name: 'Newta 1',
    email: 'newta.student1@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[0],
    userType: UserType.student,
    classId: ids.classIds[0],
    dob: new Date('08-02-2002'),
    myOptionalSubjects: [],
  },
  {
    _id: ids.studentIds[2],
    name: 'Newta 2',
    email: 'newta.student2@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[0],
    userType: UserType.student,
    classId: ids.classIds[0],
    dob: new Date('08-16-1968'),
    myOptionalSubjects: [],
  },
  {
    _id: ids.studentIds[3],
    name: 'Newta 3',
    email: 'newta.student3@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[0],
    userType: UserType.student,
    classId: ids.classIds[1],
    dob: new Date('02-04-1968'),
    myOptionalSubjects: [],
  },
  /// Other college
  {
    _id: ids.studentIds[4],
    name: 'Newta',
    email: 'newta.student4@gmail.com',
    password: 'Newta1234',
    collegeId: ids.collegeIds[1],
    userType: UserType.student,
    classId: ids.classIds[1],
    dob: new Date('05-03-1968'),
    myOptionalSubjects: [],
  },
];
