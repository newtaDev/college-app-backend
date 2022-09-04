import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_Teacher } from './teacher.model';

const create = (params: I_Teacher) => collegeDb.Teacher.create(params);

const listAll = (query?: FilterQuery<I_Teacher>) =>
  collegeDb.Teacher.find(query || {}).select(['-__v', '-password']);

const findById = (studentId: string) =>
  collegeDb.Teacher.findById(studentId).select(['-__v', '-password']);

const updateById = (studentId: string, updatedData: UpdateQuery<I_Teacher>) =>
  collegeDb.Teacher.findOneAndUpdate({ _id: studentId }, updatedData, {
    new: true,
  }).select(['-__v', '-password']);

const findOne = (query: FilterQuery<I_Teacher>) =>
  collegeDb.Teacher.findOne(query).select(['-__v', '-password']);

const deleteById = (studentId: string) =>
  collegeDb.Teacher.findByIdAndDelete(studentId).select(['-__v', '-password']);

const getCountOfTeachers = (collegeId?: string) =>
collegeDb.Teacher.find({ collegeId }).count();


export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
  getCountOfTeachers,
};
