import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import classService from '../class/class.service';
import { I_Subject } from './subject.model';

export const create = (params: I_Subject) => collegeDb.Subject.create(params);

export const listAll = (query?: FilterQuery<I_Subject>) =>
  collegeDb.Subject.find(query || {}).populate([
    'courseId',
    'classId',
    'assignedTo',
  ]);

export const findById = (subjectId: string) =>
  collegeDb.Subject.findById(subjectId);

export const getAssignedSubjectsOfTeacher = (teacherId: string) =>
  collegeDb.Subject.find({ assignedTo: teacherId }).populate([
    'courseId',
    'classId',
  ]);

export const getAssignedClassesOfTecherInSubjects = async (
  teacherId: string
) => {
  /// matched classIds without duplicates
  const classIds = (
    await collegeDb.Subject.aggregate([
      {
        $match: {
          assignedTo: {
            $eq: new Types.ObjectId(teacherId),
          },
        },
      },
      {
        $project: {
          classId: 1,
        },
      },
      {
        $group: {
          _id: '$classId',
        },
      },
      /// Adding new field [subjectId] and assignning the value of [_id]
      {
        $addFields: {
          classId: '$_id',
        },
      },
      /// removing [_id] filed
      {
        $unset: '_id',
      },
    ])
  ).map(doc => doc.classId);
  return classService.listAllWithDetailsQuery({ _id: classIds });
};
// collegeDb.Subject.find({ assignedTo: teacherId })
//   .select('classId')
//   .populate([
//     {
//       path: 'classId',
//       populate: ['collegeId', 'courseId', 'assignedToId'],
//     },
//   ]);

export const updateById = (
  subjectId: string,
  updatedData: UpdateQuery<I_Subject>
) => collegeDb.Subject.findByIdAndUpdate(subjectId, updatedData, { new: true });

export const deleteById = (subjectId: string) =>
  collegeDb.Subject.findByIdAndDelete(subjectId);

export const findOne = (query: FilterQuery<I_Subject>) =>
  collegeDb.Subject.findOne(query);

export const isSubjectAlreadyCreated = (
  updatedName: string,
  courseId: string,
  collegeId?: string
) => {
  if (!collegeId) throw Error('College (req.user.collegeId) is required');
  return findOne({ courseId, collegeId, name: updatedName });
};

export * as subjectService from './subject.service';
