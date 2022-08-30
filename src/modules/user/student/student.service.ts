import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_Student } from './student.model';

const create = (params: I_Student) => collegeDb.Student.create(params);

const listAll = (query?: FilterQuery<I_Student>) =>
  collegeDb.Student.find(query || {}).select(['-__v', '-password']);

const findById = (studentId: string) =>
  collegeDb.Student.findById(studentId).select(['-__v', '-password']);

const updateById = (studentId: string, updatedData: UpdateQuery<I_Student>) =>
  collegeDb.Student.findOneAndUpdate({ _id: studentId }, updatedData, {
    new: true,
  }).select(['-__v', '-password']);

const findOne = (query: FilterQuery<I_Student>) =>
  collegeDb.Student.findOne(query).select(['-__v', '-password']);

const deleteById = (studentId: string) =>
  collegeDb.Student.findByIdAndDelete(studentId).select(['-__v', '-password']);
export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
};
