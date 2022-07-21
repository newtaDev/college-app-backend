import { FilterQuery, UpdateQuery } from 'mongoose';
import { db } from '../../config/database/db';
import { I_Class } from './class.model';

const create = (params: I_Class) => db.Class.create(params);

const listAll = () => db.Class.find();

const findById = (classId: string) => db.Class.findById(classId);

const updateById = (classId: string, updatedData: UpdateQuery<I_Class>) =>
  db.Class.findByIdAndUpdate(classId, updatedData, { new: true });

const deleteById = (classId: string) => db.Class.findByIdAndDelete(classId);

const isClassAlreadyCreated = (updatedName?: string, collegeId?: string) => {
  if (!collegeId) throw Error('College_id (req.user.collegeId) is required');
  if (updatedName && collegeId) {
    return db.Class.findOne({ collegeId, name: updatedName });
  }
  return null;
};
export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
  isClassAlreadyCreated,
};
