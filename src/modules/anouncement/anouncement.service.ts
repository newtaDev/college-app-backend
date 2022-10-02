import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { AnounceTo } from '../../utils/enums';
import { I_Anouncement } from './anouncement.model';

export const create = (params: I_Anouncement) =>
  collegeDb.Anouncement.create(params);

export const listAll = () =>
  collegeDb.Anouncement.find()
    .sort({ createdAt: -1 })
    .populate(['createdBy.userId', 'lastModifiedBy.userId']);

export const listAllWithForStudents = (
  anounceToClassIds: string,
  showMyClassesOnly: boolean
) => {
  if (showMyClassesOnly) {
    return collegeDb.Anouncement.find({
      anounceToClassIds: { $elemMatch: { $eq: anounceToClassIds } },
    })
      .sort({ createdAt: -1 })
      .populate(['createdBy.userId', 'lastModifiedBy.userId']);
  }
  return collegeDb.Anouncement.find({
    $or: [
      { anounceTo: AnounceTo.all },
      { anounceToClassIds: { $elemMatch: { $eq: anounceToClassIds } } },
    ],
  })
    .sort({ createdAt: -1 })
    .populate(['createdBy.userId', 'lastModifiedBy.userId']);
};

export const listAllWithForTeachers = (
  teacherId: string,
  showAnouncementsCreatedByMe: boolean
) => {
  if (showAnouncementsCreatedByMe) {
    return collegeDb.Anouncement.find({ 'createdBy.userId': teacherId })
      .sort({
        createdAt: -1,
      })
      .populate(['createdBy.userId', 'lastModifiedBy.userId']);
  }
  return collegeDb.Anouncement.find({
    $or: [
      { anounceTo: AnounceTo.teachers },
      { anounceTo: AnounceTo.all },
      { 'createdBy.userId': teacherId },
    ],
  })
    .sort({ createdAt: -1 })
    .populate(['createdBy.userId', 'lastModifiedBy.userId']);
};

export const findById = (anouncementId: string) =>
  collegeDb.Anouncement.findById(anouncementId).populate([
    'createdBy.userId',
    'lastModifiedBy.userId',
  ]);

export const updateById = (
  anouncementId: string,
  updatedData: UpdateQuery<I_Anouncement>
) =>
  collegeDb.Anouncement.findByIdAndUpdate(anouncementId, updatedData, {
    new: true,
  });

export const findOne = (query: FilterQuery<I_Anouncement>) =>
  collegeDb.Anouncement.findOne(query).populate([
    'createdBy.userId',
    'lastModifiedBy.userId',
  ]);

export const deleteById = (anouncementId: string) =>
  collegeDb.Anouncement.findByIdAndDelete(anouncementId).populate([
    'createdBy.userId',
    'lastModifiedBy.userId',
  ]);

export * as anouncementServices from './anouncement.service';
