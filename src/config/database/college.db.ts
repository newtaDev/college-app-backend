import { Attendance } from '../../modules/attendance/attendance.model';
import { Anouncement } from '../../modules/anouncement/anouncement.model';
import { Class } from '../../modules/class/class.model';
import { College } from '../../modules/college/college.model';
import { Course } from '../../modules/course/course.model';
import { Subject } from '../../modules/subject/subject.model';
import { ClassTimeTable } from '../../modules/time_table/class_time_table/class_time_table.model';
import { Admin } from '../../modules/user/admin.model';
import { Faculty } from '../../modules/user/faculty.model';
import { Student } from '../../modules/user/student/student.model';
import { Teacher } from '../../modules/user/teacher/teacher.model';

/// This will be the default db
export const collegeDb = {
  /// user
  Teacher,
  Faculty,
  Admin,
  Student,
  /// other
  College,
  Class,
  Course,
  Subject,
  ClassTimeTable,
  Attendance,
  Anouncement,
};
