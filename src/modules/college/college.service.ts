import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_College } from './college.model';

const create = (params: I_College) => collegeDb.College.create(params);

const listAll = () => collegeDb.College.find();

const findById = (collegeId: string) => collegeDb.College.findById(collegeId);

const updateById = (collegeId: string, updatedData: UpdateQuery<I_College>) =>
  collegeDb.College.findByIdAndUpdate(collegeId, updatedData, { new: true });

const findOne = (query: FilterQuery<I_College>) =>
  collegeDb.College.findOne(query);

const deleteById = (collegeId: string) =>
  collegeDb.College.findByIdAndDelete(collegeId);
export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
};
