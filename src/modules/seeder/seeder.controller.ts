import { Request, Response, NextFunction } from 'express';
import { collegeDb } from '../../config/database/college.db';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { importData } from './data/data';
import { adminIds, superAdminIds } from './data/ids';
import { importAdminsData, importSuperAdminsData } from './data/admins.data';

const importCollegeData = importData.map(college => college.data);
const importTeacherData = importData.map(college => college.teachers).flat();
const importFactultyData = importData.map(college => college.faculties).flat();
const importStudentData = importData
  .map(college =>
    college.courseData
      .map(course => course.classData.map(classes => classes.students).flat())
      .flat()
  )
  .flat();

const importCourseData = importData
  .map(college => college.courseData.map(course => course.data))
  .flat();

const importClassData = importData
  .map(college =>
    college.courseData
      .map(course => course.classData.map(classes => classes.data))
      .flat()
  )
  .flat();

const importSubjectData = importData
  .map(college => college.courseData.map(course => course.subjects).flat())
  .flat();

const importAttendanceData = importData
  .map(college =>
    college.courseData
      .map(course => course.classData.map(classes => classes.attendance).flat())
      .flat()
  )
  .flat();
const importClassTimeTableData = importData
  .map(college =>
    college.courseData
      .map(course =>
        course.classData.map(classes => classes.classTimeTable).flat()
      )
      .flat()
  )
  .flat();

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
    await collegeDb.Teacher.insertMany(importTeacherData);
    /// create faculties
    await collegeDb.Faculty.insertMany(importFactultyData);
    /// create students
    await collegeDb.Student.insertMany(importStudentData);

    /// create courses
    await collegeDb.Course.insertMany(importCourseData);
    /// create classes
    await collegeDb.Class.insertMany(importClassData);
    /// create subjects
    await collegeDb.Subject.insertMany(importSubjectData);
    /// create attendences
    await collegeDb.Attendance.insertMany(importAttendanceData);
    /// create Class time table
    await collegeDb.ClassTimeTable.insertMany(importClassTimeTableData);

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
    /// TODO: Remove generated data using isTestData field
    await collegeDb.Admin.deleteMany({ _id: superAdminIds });
    /// delete Admin
    await collegeDb.Admin.deleteMany({ _id: adminIds });
    /// delete colleges
    await collegeDb.College.deleteMany({
      _id: importCollegeData.map(item => item._id),
    });
    /// delete Teacher
    await collegeDb.Teacher.deleteMany({
      _id: importTeacherData.map(item => item._id),
    });
    /// delete faculties
    await collegeDb.Faculty.deleteMany({
      _id: importFactultyData.map(item => item._id),
    });
    /// delete students
    await collegeDb.Student.deleteMany({
      _id: importStudentData.map(item => item._id),
    });

    /// delete courses
    await collegeDb.Course.deleteMany({
      _id: importCourseData.map(item => item._id),
    });
    /// delete classes
    await collegeDb.Class.deleteMany({
      _id: importClassData.map(item => item._id),
    });
    /// delete subjects
    await collegeDb.Subject.deleteMany({
      _id: importSubjectData.map(item => item._id),
    });
    /// delete attendences
    await collegeDb.Attendance.deleteMany({
      _id: importAttendanceData.map(item => item._id),
    });
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
