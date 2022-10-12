import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Attendance } from './attendance.model';

export const create = (params: I_Attendance) =>
  collegeDb.Attendance.create(params);

export const listAll = () => collegeDb.Attendance.find().sort({ updatedAt: 1 });

export const findById = (attendanceId: string) =>
  collegeDb.Attendance.findById(attendanceId);

export const updateById = (
  attendanceId: string,
  updatedData: UpdateQuery<I_Attendance>
) =>
  collegeDb.Attendance.findByIdAndUpdate(attendanceId, updatedData, {
    new: true,
  });

export const findOne = (query: FilterQuery<I_Attendance>) =>
  collegeDb.Attendance.findOne(query);

export const deleteById = (attendanceId: string) =>
  collegeDb.Attendance.findByIdAndDelete(attendanceId);

export const getAttendanceWithCountOfAbsentAndPresntStudentsByClass = (
  collegeId: string,
  classId: string,
  currentSem: number,
  totalStudentsInClass: number
) =>
  collegeDb.Attendance.aggregate([
    {
      $match: {
        collegeId: {
          $eq: new Types.ObjectId(collegeId),
        },
        /// on runtime checks if [classId] is not null  if exists and then peerform this query
        ...(classId && {
          classId: {
            $eq: new Types.ObjectId(classId),
          },
        }),
        /// on runtime checks if [currentSem] is not null and then peerform this query
        ...(currentSem && {
          currentSem: {
            $eq: currentSem,
          },
        }),
      },
    },
    {
      $addFields: {
        absentStudentCount: {
          $size: '$absentStudents',
        },
      },
    },
    {
      $addFields: {
        presentStudentCount: {
          $subtract: [totalStudentsInClass, '$absentStudentCount'],
        },
      },
    },
    /// populating [subjectId] from `subjects` collection
    {
      $lookup: {
        from: 'subjects', /// collection name
        localField: 'subjectId',
        foreignField: '_id',
        as: 'subject',
      },
    },
    {
      /// subject array will be overwritten
      $addFields: {
        // $mergeObjects: [
        //   {
        //     $arrayElemAt: ['$subject', 0],
        //   },
        // ],
        subject: {
          $arrayElemAt: ['$subject', 0],
        },
      },
    },
    { $sort: { updatedAt: -1 } },
  ]);

export const getAttendanceWithCountOfAbsentAndPresntStudentsBySubject = (
  collegeId: string,
  subjectId: string,
  classId: string,
  totalStudentsInClass: number
) =>
  collegeDb.Attendance.aggregate([
    {
      $match: {
        collegeId: {
          $eq: new Types.ObjectId(collegeId),
        },
        /// on runtime checks if [subjectId] is not null  if exists and then peerform this query
        ...(subjectId && {
          subjectId: {
            $eq: new Types.ObjectId(subjectId),
          },
        }),
        ...(classId && {
          classId: {
            $eq: new Types.ObjectId(classId),
          },
        }),
      },
    },
    {
      $addFields: {
        absentStudentCount: {
          $size: '$absentStudents',
        },
      },
    },
    {
      $addFields: {
        presentStudentCount: {
          $subtract: [totalStudentsInClass, '$absentStudentCount'],
        },
      },
    },
    /// populating [subjectId] from `subjects` collection
    {
      $lookup: {
        from: 'subjects', /// collection name
        localField: 'subjectId',
        foreignField: '_id',
        as: 'subject',
      },
    },
    {
      /// subject array will be overwritten
      $addFields: {
        // $mergeObjects: [
        //   {
        //     $arrayElemAt: ['$subject', 0],
        //   },
        // ],
        subject: {
          $arrayElemAt: ['$subject', 0],
        },
      },
    },
    { $sort: { updatedAt: -1 } },
  ]);

export const getReportOfAllSubjectsInClass = (
  collegeId: string,
  classId: string,
  currentSem: number,
  totalStudentsInClass: number
) =>
  collegeDb.Attendance.aggregate([
    {
      $match: {
        collegeId: {
          $eq: new Types.ObjectId(collegeId),
        },
        classId: {
          $eq: new Types.ObjectId(classId),
        },
        currentSem: {
          $eq: currentSem,
        },
      },
    },
    {
      $project: {
        subjectId: 1,
        absentStudents: 1,
        createdAt: 1,
        absentStudentCount: {
          $size: {
            $ifNull: ['$absentStudents', []],
          },
        },
      },
    },
    {
      $addFields: {
        presentStudentCount: {
          $subtract: [totalStudentsInClass, '$absentStudentCount'],
        },
      },
    },
    {
      $group: {
        _id: '$subjectId',
        total_attendance_taken: {
          $sum: 1,
        },
        minStudentAbsent: {
          $min: '$absentStudentCount',
        },
        maxStudentAbsent: {
          $max: '$absentStudentCount',
        },
        avgStudentAbsent: {
          $avg: '$absentStudentCount',
        },
        minStudentPresent: {
          $min: '$presentStudentCount',
        },
        maxStudentPresent: {
          $max: '$presentStudentCount',
        },
        avgStudentPresent: {
          $avg: '$presentStudentCount',
        },
      },
    },
    /// Adding new field [subjectId] and assignning the value of [_id]
    {
      $addFields: {
        subjectId: '$_id',
      },
    },
    /// removing [_id] filed
    {
      $unset: '_id',
    },
    /// populating [subjectId] from `subjects` collection
    {
      $lookup: {
        from: 'subjects', /// collection name
        localField: 'subjectId',
        foreignField: '_id',
        as: 'subject',
      },
    },
    {
      /// subject array will be overwritten
      $addFields: {
        // $mergeObjects: [
        //   {
        //     $arrayElemAt: ['$subject', 0],
        //   },
        // ],
        subject: {
          $arrayElemAt: ['$subject', 0],
        },
      },
    },
  ]);

/*
Reponse:
subject: object,
total_attendance_taken: number
 */
export const getTotalAttendanceTakenInEachSubjectsOfClass = (params: {
  collegeId: string;
  classId: string;
  currentSem: number;
}) =>
  collegeDb.Attendance.aggregate([
    {
      $match: {
        collegeId: {
          $eq: new Types.ObjectId(params.collegeId),
        },
        classId: {
          $eq: new Types.ObjectId(params.classId),
        },
        currentSem: {
          $eq: params.currentSem,
        },
      },
    },
    {
      $group: {
        _id: '$subjectId',
        total_attendance_taken: {
          $sum: 1,
        },
      },
    },
    /// Adding new field [studentId] and assignning the value of [_id]
    {
      $addFields: {
        subject: '$_id',
      },
    },
    /// removing [_id] filed
    {
      $unset: '_id',
    },
    /// populating [studentId] from `subjects` collection
    {
      $lookup: {
        from: 'subjects', /// collection name
        localField: 'subject',
        foreignField: '_id',
        as: 'subject',
      },
    },
    {
      /// subject array will be overwritten
      $addFields: {
        subject: {
          $arrayElemAt: ['$subject', 0],
        },
      },
    },
  ]);
export const getAbsentStudentsReportInEachSubject = (
  collegeId: string,
  classId: string,
  subjectId: string,
  currentSem: number
) =>
  collegeDb.Attendance.aggregate([
    {
      $match: {
        collegeId: {
          $eq: new Types.ObjectId(collegeId),
        },
        classId: {
          $eq: new Types.ObjectId(classId),
        },
        subjectId: {
          $eq: new Types.ObjectId(subjectId),
        },
        currentSem: {
          $eq: currentSem,
        },
      },
    },
    {
      $unwind: {
        path: '$absentStudents',
      },
    },
    {
      $group: {
        _id: '$absentStudents',
        absent_classes: {
          $sum: 1,
        },
      },
    },
    /// Adding new field [studentId] and assignning the value of [_id]
    {
      $addFields: {
        studentId: '$_id',
      },
    },
    /// removing [_id] filed
    {
      $unset: '_id',
    },
    /// populating [studentId] from `subjects` collection
    {
      $lookup: {
        from: 'students', /// collection name
        localField: 'studentId',
        foreignField: '_id',
        as: 'student',
      },
    },
    {
      /// subject array will be overwritten
      $addFields: {
        // $mergeObjects: [
        //   {
        //     $arrayElemAt: ['$subject', 0],
        //   },
        // ],
        student: {
          $arrayElemAt: ['$student', 0],
        },
      },
    },
    /// removing [_id] filed
    {
      $unset: 'student.password',
    },
    { $sort: { absent_classes: -1 } },
  ]);

/*
Returns:

_id : ObjectId
absent_class_count: number
subject : Object
*/
export const getAbsentClassesCountOfStudent = (params: {
  collegeId: string;
  classId: string;
  currentSem: number;
  studentId: string;
}) =>
  collegeDb.Attendance.aggregate([
    {
      $match: {
        collegeId: {
          $eq: new Types.ObjectId(params.collegeId),
        },
        classId: {
          $eq: new Types.ObjectId(params.classId),
        },
        currentSem: {
          $eq: params.currentSem,
        },
        absentStudents: {
          $elemMatch: {
            $eq: new Types.ObjectId(params.studentId),
          },
        },
      },
    },
    {
      $group: {
        _id: '$subjectId',
        absent_class_count: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: 'subjects',
        localField: '_id',
        foreignField: '_id',
        as: 'subject',
      },
    },
    {
      $addFields: {
        subject: {
          $arrayElemAt: ['$subject', 0],
        },
      },
    },
  ]);
export * as attendanceService from './attendance.service';
