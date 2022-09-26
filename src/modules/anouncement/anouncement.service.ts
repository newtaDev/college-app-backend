import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Anouncement } from './anouncement.model';

const create = (params: I_Anouncement) => collegeDb.Anouncement.create(params);

const listAll = () => collegeDb.Anouncement.find();

const findById = (anouncementId: string) =>
  collegeDb.Anouncement.findById(anouncementId);

const updateById = (
  anouncementId: string,
  updatedData: UpdateQuery<I_Anouncement>
) =>
  collegeDb.Anouncement.findByIdAndUpdate(anouncementId, updatedData, {
    new: true,
  });

const findOne = (query: FilterQuery<I_Anouncement>) =>
  collegeDb.Anouncement.findOne(query);

const deleteById = (anouncementId: string) =>
  collegeDb.Anouncement.findByIdAndDelete(anouncementId);

export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
};
