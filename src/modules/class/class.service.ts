import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Class } from './class.model';

const create = (params: I_Class) => collegeDb.Class().create(params);

const listAll = () => collegeDb.Class().find();

const findById = (classId: string) => collegeDb.Class().findById(classId);

const updateById = (classId: string, updatedData: UpdateQuery<I_Class>) =>
  collegeDb.Class().findByIdAndUpdate(classId, updatedData, { new: true });

const deleteById = (classId: string) =>
  collegeDb.Class().findByIdAndDelete(classId);

const findOne = (query: FilterQuery<I_Class>) => collegeDb.Class().findOne(query);

const isClassAlreadyCreated = (updatedName?: string, collegeId?: string) => {
  if (!collegeId) throw Error('College_id (req.user.collegeId) is required');
  if (updatedName && collegeId) {
    return findOne({ collegeId, name: updatedName });
  }
  return null;
};
export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
  isClassAlreadyCreated,
};
