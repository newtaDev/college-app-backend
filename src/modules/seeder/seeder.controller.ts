import { Request, Response, NextFunction } from 'express';
import { collegeDb } from '../../config/database/college.db';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { importAttendanceData } from './data/attendance.data';
import { importClassData } from './data/classes.data';
import { importCollegeData } from './data/colleges.data';
import { importCourseData } from './data/courses.data';
import idsData from './data/ids.data';
import { importSubjectData } from './data/subjects.data';
import {
  importAdminsData,
  importSuperAdminsData,
  importTeachersData,
  importFacultyData,
  importStudentsData,
} from './data/users.data';

export const importInitialData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /// create SuperAdmin
    await collegeDb.Admin.insertMany(importSuperAdminsData);
    /// create Admin
    await collegeDb.Admin.insertMany(importAdminsData);
    /// create colleges
    await collegeDb.College.insertMany(importCollegeData);
    /// create Teacher
    await collegeDb.Teacher.insertMany(importTeachersData);
    /// create faculties
    await collegeDb.Faculty.insertMany(importFacultyData);
    /// create students
    await collegeDb.Student.insertMany(importStudentsData);

    /// create courses
    await collegeDb.Course.insertMany(importCourseData);
    /// create classes
    await collegeDb.Class.insertMany(importClassData);
    /// create subjects
    await collegeDb.Subject.insertMany(importSubjectData);
    /// create attendences
    await collegeDb.Attendance.insertMany(importAttendanceData);

    res.send({ status: 'IMPORT SUCCESS' });
  } catch (error) {
    return next(
      new ApiException({
        message: 'Inporting data Failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 401,
      })
    );
  }
};
export const deleteInitialData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await collegeDb.Admin.deleteMany({ _id: idsData.superAdminIds });
    /// delete Admin
    await collegeDb.Admin.deleteMany({ _id: idsData.adminIds });
    /// delete colleges
    await collegeDb.College.deleteMany({ _id: idsData.collegeIds });
    /// delete Teacher
    await collegeDb.Teacher.deleteMany({ _id: idsData.teacherIds });
    /// delete faculties
    await collegeDb.Faculty.deleteMany({ _id: idsData.facultyIds });
    /// delete students
    await collegeDb.Student.deleteMany({ _id: idsData.studentIds });

    /// delete courses
    await collegeDb.Course.deleteMany({ _id: idsData.coursesIds });
    /// delete classes
    await collegeDb.Class.deleteMany({ _id: idsData.classIds });
    /// delete subjects
    await collegeDb.Subject.deleteMany({ _id: idsData.subjectIds });
    /// delete attendences
    await collegeDb.Attendance.deleteMany({ _id: idsData.attendanceIds });
    res.send({ status: 'DELETE SUCCESS' });
  } catch (error) {
    return next(
      new ApiException({
        message: 'Importing data Failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 401,
      })
    );
  }
};
