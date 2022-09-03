import { Types } from 'mongoose';
import { I_Attendance } from '../../attendance/attendance.model';
import idsData from './ids.data';

export const importAttendanceData: (I_Attendance & { _id: Types.ObjectId })[] =
  [
    {
      _id: idsData.attendanceIds[0],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[0],
      classStartTime: '09:30',
      classEndTime: '10:30',
      currentSem: 1,
      absentStudents: [idsData.studentIds[0]],
      attendanceTakenOn: new Date('08-16-2022 09:30'),
    },
    {
      _id: idsData.attendanceIds[1],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[0],
      classStartTime: '10:30',
      classEndTime: '11:30',
      currentSem: 1,
      attendanceTakenOn: new Date('08-16-2022 10:30'),
      absentStudents: [idsData.studentIds[0], idsData.studentIds[1]],
    },
    {
      _id: idsData.attendanceIds[2],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[0],
      classStartTime: '11:30',
      classEndTime: '12:30',
      currentSem: 1,
      attendanceTakenOn: new Date('08-16-2022 11:30'),
      absentStudents: [
        idsData.studentIds[0],
        idsData.studentIds[1],
      ],
    },
    {
      _id: idsData.attendanceIds[3],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[1],
      classStartTime: '09:30',
      classEndTime: '10:30',
      currentSem: 1,
      attendanceTakenOn: new Date('08-14-2022 09:30'),
      absentStudents: [],
    },
    {
      _id: idsData.attendanceIds[4],
      classId: idsData.classIds[1],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[2],
      classStartTime: '10:30',
      classEndTime: '11:30',
      currentSem: 2,
      attendanceTakenOn: new Date('08-14-2022 10:30'),
      absentStudents: [],
    },
    {
      _id: idsData.attendanceIds[5],
      classId: idsData.classIds[1],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[1],
      classStartTime: '11:30',
      classEndTime: '12:30',
      attendanceTakenOn: new Date('08-14-2022 11:30'),
      currentSem: 2,
      absentStudents: [
        idsData.studentIds[3],
      ],
    },
    {
      _id: idsData.attendanceIds[6],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[1],
      classStartTime: '09:30',
      classEndTime: '10:30',
      currentSem: 1,
      absentStudents: [idsData.studentIds[0]],
      attendanceTakenOn: new Date('08-16-2022 09:30'),
    },
    {
      _id: idsData.attendanceIds[7],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[2],
      classStartTime: '10:30',
      classEndTime: '11:30',
      currentSem: 1,
      attendanceTakenOn: new Date('08-16-2022 10:30'),
      absentStudents: [idsData.studentIds[0], idsData.studentIds[1]],
    },
    {
      _id: idsData.attendanceIds[8],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[3],
      classStartTime: '11:30',
      classEndTime: '12:30',
      currentSem: 1,
      attendanceTakenOn: new Date('08-16-2022 11:30'),
      absentStudents: [
      ],
    },
    {
      _id: idsData.attendanceIds[9],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[0],
      classStartTime: '11:30',
      classEndTime: '12:30',
      currentSem: 1,
      attendanceTakenOn: new Date('08-16-2022 11:30'),
      absentStudents: [
      ],
    },
    {
      _id: idsData.attendanceIds[10],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[3],
      classStartTime: '09:30',
      classEndTime: '10:30',
      currentSem: 1,
      attendanceTakenOn: new Date('08-15-2022 09:30'),
      absentStudents: [],
    },
    {
      _id: idsData.attendanceIds[11],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[4],
      classStartTime: '10:30',
      classEndTime: '11:30',
      currentSem: 2,
      attendanceTakenOn: new Date('08-14-2022 10:30'),
      absentStudents: [idsData.studentIds[0], idsData.studentIds[1]],
    },
    {
      _id: idsData.attendanceIds[12],
      classId: idsData.classIds[0],
      collegeId: idsData.collegeIds[0],
      subjectId: idsData.subjectIds[4],
      classStartTime: '11:30',
      classEndTime: '12:30',
      attendanceTakenOn: new Date('08-15-2022 11:30'),
      currentSem: 2,
      absentStudents: [
        idsData.studentIds[0],
        idsData.studentIds[1],
        idsData.studentIds[2],
      ],
    },
  ];
