import mongoose from 'mongoose';
import { adminSchema, I_Admin } from '../../modules/user/admin.model';
import { facultySchema, I_Faculty } from '../../modules/user/faculty.model';
import { I_Student, studentSchema } from '../../modules/user/student.model';
import { I_Teacher, teacherSchema } from '../../modules/user/teacher.model';

const _db = mongoose.connection.useDb('user_db');

/// This is users database
export const userDb = {
  Teacher: _db.model<I_Teacher>('Teacher', teacherSchema),
  Faculty: _db.model<I_Faculty>('Faculty', facultySchema),
  Admin: _db.model<I_Admin>('Admin', adminSchema),
  Student: _db.model<I_Student>('Student', studentSchema),
};
