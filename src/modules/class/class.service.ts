import { FilterQuery, UpdateQuery } from 'mongoose';
import { db } from '../../config/database/db';
import { I_Class } from './class.model';

const create = (params: I_Class) => db.Class.create(params);

const listAll = () => db.Class.find();

const findById = (classId: string) => db.Class.findById(classId);


const updateById = (classId: string, updatedData: UpdateQuery<I_Class>) =>
  db.Class.findByIdAndUpdate(classId, updatedData, { new: true });

const deleteById = (classId: string) => db.Class.findByIdAndDelete(classId);
export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
};
