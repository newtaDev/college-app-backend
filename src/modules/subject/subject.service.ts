import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Subject } from './subject.model';

const create = (params: I_Subject) => collegeDb.Subject.create(params);

const listAll = (query?: FilterQuery<I_Subject>) =>
  collegeDb.Subject.find(query || {});

const findById = (subjectId: string) => collegeDb.Subject.findById(subjectId);

const updateById = (subjectId: string, updatedData: UpdateQuery<I_Subject>) =>
  collegeDb.Subject.findByIdAndUpdate(subjectId, updatedData, { new: true });

const deleteById = (subjectId: string) =>
  collegeDb.Subject.findByIdAndDelete(subjectId);

const findOne = (query: FilterQuery<I_Subject>) =>
  collegeDb.Subject.findOne(query);

const isSubjectAlreadyCreated = (
  updatedName: string,
  courseId: string,
  collegeId?: string
) => {
  if (!collegeId) throw Error('College (req.user.collegeId) is required');
  return findOne({ courseId, collegeId, name: updatedName });
};

export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
  isSubjectAlreadyCreated,
};
