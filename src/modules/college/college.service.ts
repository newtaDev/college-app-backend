import { UpdateQuery } from 'mongoose';
import { db } from '../../config/database/db';
import { I_College } from './college.model';

const create = (params: I_College) => db.College.create(params);

const listAll = () => db.College.find();

const findById = (collegeId: string) => db.College.findById(collegeId);

const updateById = (collegeId: string, updatedData: UpdateQuery<I_College>) =>
  db.College.findByIdAndUpdate(collegeId, updatedData, { new: true });

const deleteById = (collegeId: string) =>
  db.College.findByIdAndDelete(collegeId);
export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
};
