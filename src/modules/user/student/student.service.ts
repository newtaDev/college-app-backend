import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_Student } from './student.model';

const create = (params: I_Student) => collegeDb.Student.create(params);

const listAll = () => collegeDb.Student.find();

const findById = (studentId: string) => collegeDb.Student.findById(studentId);

const updateById = (studentId: string, updatedData: UpdateQuery<I_Student>) =>
  collegeDb.Student.findOneAndUpdate({ _id: studentId }, updatedData, {
    new: true,
  });

const findOne = (query: FilterQuery<I_Student>) =>
  collegeDb.Student.findOne(query);

const deleteById = (studentId: string) =>
  collegeDb.Student.findByIdAndDelete(studentId);
export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
};
