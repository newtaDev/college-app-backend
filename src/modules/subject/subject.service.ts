import { UpdateQuery } from 'mongoose';
import { db } from '../../config/database/db';
import { I_Subject } from './subject.model';


const create = (params: I_Subject) => db.Subject.create(params);

const listAll = () => db.Subject.find();

const findById = (subjectId: string) => db.Subject.findById(subjectId);

const updateById = (subjectId: string, updatedData: UpdateQuery<I_Subject>) =>
  db.Subject.findByIdAndUpdate(subjectId, updatedData, { new: true });

const deleteById = (subjectId: string) => db.Subject.findByIdAndDelete(subjectId);
export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
};
