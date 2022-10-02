import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { I_Student } from './student.model';

const _populateClass = [
  {
    path: 'classId',
    populate: {
      path: 'courseId',
    },
  },
];
const create = (params: I_Student) => collegeDb.Student.create(params);

const listAll = (query?: FilterQuery<I_Student>) =>
  collegeDb.Student.find(query || {})
    .populate(_populateClass);

const findById = (studentId: string) =>
  collegeDb.Student.findById(studentId)
    .populate(_populateClass);

const updateById = (studentId: string, updatedData: UpdateQuery<I_Student>) =>
  collegeDb.Student.findOneAndUpdate({ _id: studentId }, updatedData, {
    new: true,
  })
    .populate(_populateClass);

const findOne = (query: FilterQuery<I_Student>) =>
  collegeDb.Student.findOne(query)
    .populate(_populateClass);

const deleteById = (studentId: string) =>
  collegeDb.Student.findByIdAndDelete(studentId)
    .populate(_populateClass);

const getCountOfStudents = (collegeId?: string, classId?: string) =>
  collegeDb.Student.find({ collegeId, classId }).count();

export default {
  create,
  listAll,
  findById,
  findOne,
  updateById,
  deleteById,
  getCountOfStudents,
};
