import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_ClassTimeTable } from './class_time_table.model';

const create = (params: I_ClassTimeTable) =>
  collegeDb.ClassTimeTable.create(params);

const listAll = (query?: FilterQuery<I_ClassTimeTable>) =>
  collegeDb.ClassTimeTable.find(query ?? {})
    .sort({ startingTime: 1 })
    .populate([
      'subjectId',
      'teacherId',
      { path: 'classId', populate: ['courseId'] },
    ]);

const findById = (classTimeTableId: string) =>
  collegeDb.ClassTimeTable.findById(classTimeTableId);

const updateById = (
  classTimeTableId: string,
  updatedData: UpdateQuery<I_ClassTimeTable>
) =>
  collegeDb.ClassTimeTable.findByIdAndUpdate(classTimeTableId, updatedData, {
    new: true,
  });

const deleteById = (classTimeTableId: string) =>
  collegeDb.ClassTimeTable.findByIdAndDelete(classTimeTableId);

export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
};
