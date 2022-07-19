import mongoose from 'mongoose';
import {
  AdminModel,
  adminSchema,
  I_Admin,
} from '../../modules/user/admin.model';
import {
  FacultyModel,
  facultySchema,
  I_Faculty,
} from '../../modules/user/faculty.model';
import {
  I_Student,
  StudentModel,
  studentSchema,
} from '../../modules/user/student.model';
import {
  I_Teacher,
  TeacherModel,
  teacherSchema,
} from '../../modules/user/teacher.model';

const _db = mongoose.connection.useDb('user_db');

/// This is users database
export const userDb = {
  Teacher: _db.model<I_Teacher, TeacherModel>('Teacher', teacherSchema),
  Faculty: _db.model<I_Faculty, FacultyModel>('Faculty', facultySchema),
  Admin: _db.model<I_Admin, AdminModel>('Admin', adminSchema),
  Student: _db.model<I_Student, StudentModel>('Student', studentSchema),
};
