import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Attendance } from './attendance.model';

const create = (params: I_Attendance) => collegeDb.Attendance.create(params);

const listAll = () => collegeDb.Attendance.find();

const findById = (attendanceId: string) =>
  collegeDb.Attendance.findById(attendanceId);

const updateById = (
  attendanceId: string,
  updatedData: UpdateQuery<I_Attendance>
) =>
  collegeDb.Attendance.findByIdAndUpdate(attendanceId, updatedData, {
    new: true,
  });

const findOne = (query: FilterQuery<I_Attendance>) =>
  collegeDb.Attendance.findOne(query);

const deleteById = (attendanceId: string) =>
  collegeDb.Attendance.findByIdAndDelete(attendanceId);

const getReportOfAllSubjectsInClass = (
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
const getAbsentStudentsReportInEachSubject = (
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
  ]);
export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
  getAbsentStudentsReportInEachSubject,
  getReportOfAllSubjectsInClass,
};
