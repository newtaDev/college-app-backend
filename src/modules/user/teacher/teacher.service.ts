import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_Teacher } from './teacher.model';

const create = (params: I_Teacher) => collegeDb.Teacher.create(params);

const listAll = (query?: FilterQuery<I_Teacher>) =>
  collegeDb.Teacher.find(query || {})
    .populate('assignedClasses');

const findById = (teacherId: string) =>
  collegeDb.Teacher.findById(teacherId)
    .populate('assignedClasses');

const updateById = (teacherId: string, updatedData: UpdateQuery<I_Teacher>) =>
  collegeDb.Teacher.findOneAndUpdate({ _id: teacherId }, updatedData, {
    new: true,
  })
    .populate('assignedClasses');

const findOne = (query: FilterQuery<I_Teacher>) =>
  collegeDb.Teacher.findOne(query)
    .populate('assignedClasses');

const deleteById = (teacherId: string) =>
  collegeDb.Teacher.findByIdAndDelete(teacherId)
    .populate('assignedClasses');

const getCountOfTeachers = (collegeId?: string) =>
  collegeDb.Teacher.find({ collegeId }).count();

const getAssignedClasses = async (teacherId: string) =>
  (
    await collegeDb.Teacher.findById(teacherId)
      .populate([
        {
          path: 'assignedClasses',
          populate: [
            'collegeId',
            'courseId',
            { path: 'assignedToId', select: '-password' },
          ],
        },
      ])
  )?.assignedClasses;
// const getAssignedClasses = (teacherId: string) =>
//   collegeDb.Teacher.aggregate([
//     {
//       $match: {
//         _id: {
//           $eq: new Types.ObjectId(teacherId),
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: 'classes', /// collection name
//         localField: 'assignedClasses',
//         foreignField: '_id',
//         as: 'assignedClasses',
//       },
//     },
//     {
//       $unwind: {
//         path: '$assignedClasses',
//       },
//     },
//     {
//       $lookup: {
//         from: 'colleges', /// collection name
//         localField: 'assignedClasses.collegeId',
//         foreignField: '_id',
//         as: 'assignedClasses.collegeId',
//       },
//     },
//     {
//       $lookup: {
//         from: 'courses', /// collection name
//         localField: 'assignedClasses.courseId',
//         foreignField: '_id',
//         as: 'assignedClasses.courseId',
//       },
//     },
//     {
//       /// array will be overwritten to single object
//       $addFields: {
//         'assignedClasses.collegeId': {
//           $arrayElemAt: ['$assignedClasses.collegeId', 0],
//         },

//         'assignedClasses.courseId': {
//           $arrayElemAt: ['$assignedClasses.courseId', 0],
//         },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           _id: '$assignedClasses',
//         },
//       },
//     },
//     {
//       $replaceRoot: {
//         newRoot: '$_id._id',
//       },
//     },
//     {
//       $lookup: {
//         from: 'teachers', /// collection name
//         localField: 'assignedToId',
//         foreignField: '_id',
//         as: 'assignedToId',
//       },
//     },
//     {
//       /// array will be overwritten to single object
//       $addFields: {
//         assignedToId: {
//           $arrayElemAt: ['$assignedToId', 0],
//         },
//       },
//     },
//   ]);

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
