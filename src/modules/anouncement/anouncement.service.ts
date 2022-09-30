import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { AnounceTo } from '../../utils/enums';
import { I_Anouncement } from './anouncement.model';

export const create = (params: I_Anouncement) =>
  collegeDb.Anouncement.create(params);

export const listAll = () =>
  collegeDb.Anouncement.find().sort({ createdAt: -1 });

export const listAllWithForStudents = (
  anounceToClassIds: string,
  showMyClassesOnly: boolean
) => {
  if (showMyClassesOnly) {
    return collegeDb.Anouncement.find({
      anounceToClassIds: { $elemMatch: { $eq: anounceToClassIds } },
    }).sort({ createdAt: -1 });
  }
  return collegeDb.Anouncement.find({
    $or: [
      { anounceTo: AnounceTo.students },
      { anounceTo: AnounceTo.all },
      { anounceToClassIds: { $elemMatch: { $eq: anounceToClassIds } } },
    ],
  }).sort({ createdAt: -1 });
};

export const listAllWithForTeachers = (
  teacherId: string,
  showAnouncementsCreatedByMe: boolean
) => {
  if (showAnouncementsCreatedByMe) {
    return collegeDb.Anouncement.find({ 'createdBy.userId': teacherId }).sort({
      createdAt: -1,
    });
  }
  return collegeDb.Anouncement.find({
    $or: [
      { anounceTo: AnounceTo.teachers },
      { anounceTo: AnounceTo.all },
      { 'createdBy.userId': teacherId },
    ],
  }).sort({ createdAt: -1 });
};

export const findById = (anouncementId: string) =>
  collegeDb.Anouncement.findById(anouncementId);

export const updateById = (
  anouncementId: string,
  updatedData: UpdateQuery<I_Anouncement>
) =>
  collegeDb.Anouncement.findByIdAndUpdate(anouncementId, updatedData, {
    new: true,
  });

export const findOne = (query: FilterQuery<I_Anouncement>) =>
  collegeDb.Anouncement.findOne(query);

export const deleteById = (anouncementId: string) =>
  collegeDb.Anouncement.findByIdAndDelete(anouncementId);

export * as anouncementServices from './anouncement.service';
