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

const deleteById = (courseId: string) =>
  collegeDb.Course.findByIdAndDelete(courseId);

const isCourseAlreadyCreated = (updatedName?: string, collegeId?: string) => {
  if (!collegeId) throw Error('College_id (req.user.collegeId) is required');
  if (updatedName && collegeId) {
    return collegeDb.Course.findOne({ collegeId, name: updatedName });
  }
  return null;
};

/// On subject create/update, if [isMainSubject] is true then push [mainSubject id] to [course.mainSubjectIds] list in course collection
/// On subject create/update, if [isMainSubject] is false then push [optionalSubject id] to [course.optionalSubjectIds] list in course collection
/// returns updated [Course]
const insertSubjectIdToCourse = (
  subject: Document<unknown, unknown, I_Subject> & I_Subject
) =>
  collegeDb.Course.findOneAndUpdate(
    {
      _id: subject.courseId,
      collegeId: subject.collegeId,
    },
    {
      $push: {
        ...(subject.isMainSubject && { mainSubjectIds: subject.id }),
        ...(!subject.isMainSubject && { optionalSubjectIds: subject.id }),
      },
    },
    { new: true }
  );

/// removes matched subject id from list of [optionalSubjectIds] and [mainSubjectIds]
/// returns updated [Course]
const removeAndInsertSubjectIdToCourse = async (
  _subject: Document<unknown, unknown, I_Subject> & I_Subject
) => {
  /// remove
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
  /// insert
  return insertSubjectIdToCourse(_subject);
};

export default {
  create,
  listAll,
  findById,
  updateById,
  deleteById,
  isCourseAlreadyCreated,
  insertSubjectIdToCourse,
  removeAndInsertSubjectIdToCourse,
};
