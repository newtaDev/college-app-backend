import { UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Subject } from './subject.model';

const create = (params: I_Subject) => collegeDb.Subject.create(params);

const listAll = () => collegeDb.Subject.find();

const findById = (subjectId: string) => collegeDb.Subject.findById(subjectId);

const updateById = (subjectId: string, updatedData: UpdateQuery<I_Subject>) =>
  collegeDb.Subject.findByIdAndUpdate(subjectId, updatedData, { new: true });

const deleteById = (subjectId: string) =>
  collegeDb.Subject.findByIdAndDelete(subjectId);

const isSubjectAlreadyCreated = (
  updatedName: string,
  courseId: string,
  collegeId?: string
) => {
  if (!collegeId) throw Error('College (req.user.collegeId) is required');
  return collegeDb.Subject.findOne({ courseId, collegeId, name: updatedName });
};

export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
  isSubjectAlreadyCreated,
};
