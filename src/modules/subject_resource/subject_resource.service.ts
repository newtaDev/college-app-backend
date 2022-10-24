import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_SubjectResource } from './subject_resource.model';

export const create = (params: I_SubjectResource) =>
  collegeDb.SubjectResource.create(params);

export const listAll = () => collegeDb.SubjectResource.find();
export const getAllSubjectResources = (subjectId: string) =>
  collegeDb.SubjectResource.find({ subjectId }).sort({ createdAt: -1 });

export const findById = (id: string) => collegeDb.SubjectResource.findById(id).populate('comments.userId');
export const updateById = (
  id: string,
  updatedData: UpdateQuery<I_SubjectResource>
) => collegeDb.SubjectResource.findByIdAndUpdate(id, updatedData, { new: true });

export const findOne = (query: FilterQuery<I_SubjectResource>) =>
  collegeDb.SubjectResource.findOne(query);

export const deleteById = (id: string) =>
  collegeDb.SubjectResource.findByIdAndDelete(id);

export const deleteCommentById = (resourceId: string, commentId: string) =>
  collegeDb.SubjectResource.findByIdAndUpdate(
    resourceId,
    {
      $pull: { comments: { _id: commentId } },
    },
    { new: true }
  );

export * as subjectPostService from './subject_resource.service';
