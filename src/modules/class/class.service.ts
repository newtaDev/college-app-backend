import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Class } from './class.model';

const create = (params: I_Class) => collegeDb.Class.create(params);

const listAll = (collegeId: string) => collegeDb.Class.find({ collegeId });
const listAllWithDetails = (collegeId: string) =>
  collegeDb.Class.find({ collegeId }).populate([
    'collegeId',
    'courseId',
    'assignedToId',
  ]);

const findById = (classId: string, collegeId: string) =>
  collegeDb.Class.findOne({ classId, collegeId });

const updateById = (
  classId: string,
  collegeId: string,
  updatedData: UpdateQuery<I_Class>
) =>
  collegeDb.Class.findOneAndUpdate({ classId, collegeId }, updatedData, {
    new: true,
  });

const deleteById = (classId: string, collegeId: string) =>
  collegeDb.Class.findOneAndDelete({ classId, collegeId });

const findOne = (query: FilterQuery<I_Class>, collegeId: string) =>
  collegeDb.Class.findOne({ collegeId, ...query });

const isClassAlreadyCreated = (updatedName?: string, collegeId?: string) => {
  if (!collegeId) throw Error('College_id (req.user.collegeId) is required');
  if (updatedName && collegeId) {
    return findOne({ collegeId, name: updatedName }, collegeId);
  }
  return null;
};
export default {
  create,
  listAll,
  listAllWithDetails,
  findById,
  findOne,
  updateById,
  deleteById,
  isClassAlreadyCreated,
};
