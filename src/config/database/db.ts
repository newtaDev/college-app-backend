import mongoose from 'mongoose';
import { classSchema, I_Class } from '../../modules/class/class.model';
import { collegeSchema, I_College } from '../../modules/college/college.model';
import { courseSchema, I_Course } from '../../modules/course/course.model';
import { I_Subject, subjectSchema } from '../../modules/subject/subject.model';
import { AppKeys } from '../keys/app_keys';
const _db = mongoose.connection.useDb(AppKeys.default_db);

/// This will be the default db
export const db = {
  College: _db.model<I_College>('College', collegeSchema),
  Class: _db.model<I_Class>('Class', classSchema),
  Course: _db.model<I_Course>('Course', courseSchema),
  Subject: _db.model<I_Subject>('Subject', subjectSchema),
};
