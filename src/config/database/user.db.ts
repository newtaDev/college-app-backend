import { Admin } from '../../modules/user/admin.model';
import { Faculty } from '../../modules/user/faculty.model';
import { Student } from '../../modules/user/student.model';
import { Teacher } from '../../modules/user/teacher.model';

/// This is users database
export const userDb = {
  Teacher,
  Faculty,
  Admin,
  Student,
};
