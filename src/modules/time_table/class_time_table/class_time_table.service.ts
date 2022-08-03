import { UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_ClassTimeTable } from './class_time_table.model';

const create = (params: I_ClassTimeTable) =>
  collegeDb.ClassTimeTable().create(params);

const listAll = () => collegeDb.ClassTimeTable().find();

const findById = (classTimeTableId: string) =>
  collegeDb.ClassTimeTable().findById(classTimeTableId);

const updateById = (
  classTimeTableId: string,
  updatedData: UpdateQuery<I_ClassTimeTable>
) =>
  collegeDb.ClassTimeTable().findByIdAndUpdate(classTimeTableId, updatedData, {
    new: true,
  });

const deleteById = (classTimeTableId: string) =>
  collegeDb.ClassTimeTable().findByIdAndDelete(classTimeTableId);

export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
};
