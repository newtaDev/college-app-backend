import { Document } from 'mongoose';
import { UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_Subject } from '../subject/subject.model';
import { I_Course } from './course.model';

const create = (params: I_Course) => collegeDb.Course.create(params);

const listAll = () => collegeDb.Course.find();

const findById = (courseId: string) => collegeDb.Course.findById(courseId);

const updateById = (courseId: string, updatedData: UpdateQuery<I_Course>) =>
  collegeDb.Course.findByIdAndUpdate(courseId, updatedData, { new: true });

const deleteById = (courseId: string) => collegeDb.Course.findByIdAndDelete(courseId);

const isCourseAlreadyCreated = (updatedName?: string, collegeId?: string) => {
  if (!collegeId) throw Error('College_id (req.user.collegeId) is required');
  if (updatedName && collegeId) {
    return collegeDb.Course.findOne({ collegeId, name: updatedName });
  }
  return null;
};

const removeAndInsertSubjectIdToCourse = async (
  _subject: Document<unknown, unknown, I_Subject> & I_Subject
) => {
  await collegeDb.Course.updateMany(
    {
      _id: _subject.courseId,
      collegeId: _subject.collegeId,
      $or: [
        { mainSubjectIds: _subject.id },
        { optionalSubjectIds: _subject.id },
      ],
    },
    {
      $pull: {
        optionalSubjectIds: { $eq: _subject.id },
        mainSubjectIds: { $eq: _subject.id },
      },
    }
  );
  return await collegeDb.Course.findOneAndUpdate(
    {
      _id: _subject.courseId,
      collegeId: _subject.collegeId,
    },
    {
      $push: {
        ...(_subject.isMainSubject && { mainSubjectIds: _subject.id }),
        ...(!_subject.isMainSubject && { optionalSubjectIds: _subject.id }),
      },
    },
    { new: true }
  );
};

export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
  isCourseAlreadyCreated,
  removeAndInsertSubjectIdToCourse,
};
