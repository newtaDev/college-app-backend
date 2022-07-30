import { Class } from '../../modules/class/class.model';
import { College } from '../../modules/college/college.model';
import { Course } from '../../modules/course/course.model';
import { Subject } from '../../modules/subject/subject.model';
import { ClassTimeTable } from '../../modules/time_table/class_time_table/class_time_table.model';

/// This will be the default db
export const collegeDb = {
  College,
  Class,
  Course,
  Subject,
  ClassTimeTable,
};
