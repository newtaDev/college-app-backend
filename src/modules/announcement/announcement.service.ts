import { FilterQuery, UpdateQuery } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { AnounceTo } from '../../utils/enums';
import { I_Announcement } from './announcement.model';

export const create = (params: I_Announcement) =>
  collegeDb.Announcement.create(params);

export const listAll = () =>
  collegeDb.Announcement.find()
    .sort({ createdAt: -1 })
    .populate(['createdBy.userId', 'lastModifiedBy.userId']);

export const listAllWithForStudents = (
  anounceToClassIds: string,
  showMyClassesOnly: boolean
) => {
  if (showMyClassesOnly) {
    return collegeDb.Announcement.find({
      anounceToClassIds: { $elemMatch: { $eq: anounceToClassIds } },
    })
      .sort({ createdAt: -1 })
      .populate(['createdBy.userId', 'lastModifiedBy.userId']);
  }
  return collegeDb.Announcement.find({
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
  showAnnouncementsCreatedByMe: boolean
) => {
  if (showAnnouncementsCreatedByMe) {
    return collegeDb.Announcement.find({ 'createdBy.userId': teacherId })
      .sort({
        createdAt: -1,
      })
      .populate(['createdBy.userId', 'lastModifiedBy.userId']);
  }
  return collegeDb.Announcement.find({
    $or: [
      { anounceTo: AnounceTo.teachers },
      { anounceTo: AnounceTo.all },
      { 'createdBy.userId': teacherId },
    ],
  })
    .sort({ createdAt: -1 })
    .populate(['createdBy.userId', 'lastModifiedBy.userId']);
};

export const findById = (announcementId: string) =>
  collegeDb.Announcement.findById(announcementId).populate([
    'createdBy.userId',
    'lastModifiedBy.userId',
  ]);

export const updateById = (
  announcementId: string,
  updatedData: UpdateQuery<I_Announcement>
) =>
  collegeDb.Announcement.findByIdAndUpdate(announcementId, updatedData, {
    new: true,
  });

export const findOne = (query: FilterQuery<I_Announcement>) =>
  collegeDb.Announcement.findOne(query).populate([
    'createdBy.userId',
    'lastModifiedBy.userId',
  ]);

export const deleteById = (announcementId: string) =>
  collegeDb.Announcement.findByIdAndDelete(announcementId).populate([
    'createdBy.userId',
    'lastModifiedBy.userId',
  ]);

export * as announcementServices from './announcement.service';
