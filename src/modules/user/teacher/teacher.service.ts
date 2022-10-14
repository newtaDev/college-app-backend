import { FilterQuery, UpdateQuery, Document, Types } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { subjectService } from '../../subject/subject.service';
import { I_Teacher, I_TeacherMethods } from './teacher.model';

type TeacherDoc =
  | (Document<unknown, unknown, I_Teacher> &
      I_Teacher & {
        _id: Types.ObjectId;
      } & I_TeacherMethods)
  | null;

export const generateWithAssignedSubjects = async (teacherDoc: TeacherDoc) => {
  if (teacherDoc) {
    const assignedSubjects = await subjectService.findAssignedSubjectsOfTeacher(
      teacherDoc._id.toString()
    );
    const _teacher = {
      ...teacherDoc.toObject(),
      assignedSubjects: assignedSubjects,
    };
    return _teacher;
  }
  return null;
};
export const create = async (params: I_Teacher) => {
  const teacher = await collegeDb.Teacher.create(params);
  return generateWithAssignedSubjects(teacher);
};

export const listAll = async (query?: FilterQuery<I_Teacher>) => {
  const teachers = await collegeDb.Teacher.find(query || {}).populate([
    'assignedClasses',
  ]);
  const teachersList = [];
  for (let index = 0; index < teachers.length; index++) {
    if (teachers[index]) {
      const assignedSubjects =
        await subjectService.findAssignedSubjectsOfTeacher(
          teachers[index]._id.toString()
        );
      const _doc = {
        ...teachers[index].toObject(),
        assignedSubjects: assignedSubjects,
      };
      teachersList.push(_doc);
    }
  }
  return teachersList;
};

export const findById = async (teacherId: string) => {
  const teacher = await collegeDb.Teacher.findById(teacherId).populate([
    'assignedClasses',
  ]);
  return generateWithAssignedSubjects(teacher);
};

export const updateById = async (
  teacherId: string,
  updatedData: UpdateQuery<I_Teacher>
) => {
  const teacher = await collegeDb.Teacher.findOneAndUpdate(
    { _id: teacherId },
    updatedData,
    { new: true }
  ).populate(['assignedClasses']);
  return generateWithAssignedSubjects(teacher);
};

export const findOne = async (query: FilterQuery<I_Teacher>) => {
  const teacher = await collegeDb.Teacher.findOne(query).populate([
    'assignedClasses',
  ]);
  return generateWithAssignedSubjects(teacher);
};

export const deleteById = (teacherId: string) =>
  collegeDb.Teacher.findByIdAndDelete(teacherId).populate(['assignedClasses']);

export const getCountOfTeachers = (collegeId?: string) =>
  collegeDb.Teacher.find({ collegeId }).count();

export const getAssignedClasses = async (teacherId: string) =>
  (
    await collegeDb.Teacher.findById(teacherId).populate([
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

export * as teacherService from './teacher.service';
