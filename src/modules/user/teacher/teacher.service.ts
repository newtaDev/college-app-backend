import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_Teacher } from './teacher.model';

const create = (params: I_Teacher) => collegeDb.Teacher.create(params);

const listAll = (query?: FilterQuery<I_Teacher>) =>
  collegeDb.Teacher.find(query || {}).select(['-__v', '-password']);

const findById = (teacherId: string) =>
  collegeDb.Teacher.findById(teacherId).select(['-__v', '-password']);

const updateById = (teacherId: string, updatedData: UpdateQuery<I_Teacher>) =>
  collegeDb.Teacher.findOneAndUpdate({ _id: teacherId }, updatedData, {
    new: true,
  }).select(['-__v', '-password']);

const findOne = (query: FilterQuery<I_Teacher>) =>
  collegeDb.Teacher.findOne(query).select(['-__v', '-password']);

const deleteById = (teacherId: string) =>
  collegeDb.Teacher.findByIdAndDelete(teacherId).select(['-__v', '-password']);

const getCountOfTeachers = (collegeId?: string) =>
  collegeDb.Teacher.find({ collegeId }).count();

const getAssignedClasses = (teacherId: string) =>
  collegeDb.Teacher.aggregate([
    {
      $match: {
        _id: {
          $eq: new Types.ObjectId(teacherId),
        },
      },
    },
    {
      $lookup: {
        from: 'classes', /// collection name
        localField: 'assignedClasses',
        foreignField: '_id',
        as: 'assignedClasses',
      },
    },
    {
      $unwind: {
        path: '$assignedClasses',
      },
    },
    {
      $lookup: {
        from: 'colleges', /// collection name
        localField: 'assignedClasses.collegeId',
        foreignField: '_id',
        as: 'assignedClasses.collegeId',
      },
    },
    {
      $lookup: {
        from: 'courses', /// collection name
        localField: 'assignedClasses.courseId',
        foreignField: '_id',
        as: 'assignedClasses.courseId',
      },
    },
    {
      /// array will be overwritten to single object
      $addFields: {
        'assignedClasses.collegeId': {
          $arrayElemAt: ['$assignedClasses.collegeId', 0],
        },

        'assignedClasses.courseId': {
          $arrayElemAt: ['$assignedClasses.courseId', 0],
        },
      },
    },
    {
      $group: {
        _id: {
          _id: '$assignedClasses',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: '$_id._id',
      },
    },
    {
      $lookup: {
        from: 'teachers', /// collection name
        localField: 'assignedToId',
        foreignField: '_id',
        as: 'assignedToId',
      },
    },
    {
      /// array will be overwritten to single object
      $addFields: {
        assignedToId: {
          $arrayElemAt: ['$assignedToId', 0],
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
  getCountOfTeachers,
  getAssignedClasses,
};
