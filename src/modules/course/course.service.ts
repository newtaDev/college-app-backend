import { UpdateQuery } from 'mongoose';
import { db } from '../../config/database/db';
import { I_Course } from './course.model';

const create = (params: I_Course) => db.Course.create(params);

const listAll = () => db.Course.find();

const findById = (courseId: string) => db.Course.findById(courseId);

const updateById = (courseId: string, updatedData: UpdateQuery<I_Course>) =>
  db.Course.findByIdAndUpdate(courseId, updatedData, { new: true });

const deleteById = (courseId: string) => db.Course.findByIdAndDelete(courseId);
export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
};
