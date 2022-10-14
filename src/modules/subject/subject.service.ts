import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Subject } from './subject.model';

export const create = (params: I_Subject) => collegeDb.Subject.create(params);

export const listAll = (query?: FilterQuery<I_Subject>) =>
  collegeDb.Subject.find(query || {}).populate('courseId');

export const findById = (subjectId: string) =>
  collegeDb.Subject.findById(subjectId);

export const findAssignedSubjectsOfTeacher = (teacherId: string) =>
  collegeDb.Subject.find({ assignedTo: teacherId }).populate([
    'courseId',
    'classId',
  ]);

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
