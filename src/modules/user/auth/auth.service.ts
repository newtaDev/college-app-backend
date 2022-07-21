import { userDb } from '../../../config/database/user.db';
import { UserType } from '../../../utils/enums';
import { I_Admin } from '../admin.model';
import { I_Faculty } from '../faculty.model';
import { I_Student } from '../student.model';
import { I_Teacher } from '../teacher.model';

const registerAsTeacher = (teacher: I_Teacher) =>
  userDb.Teacher.create(teacher);
const registerAsStudent = (student: I_Student) =>
  userDb.Student.create(student);
const registerAsFaculty = (faculty: I_Faculty) =>
  userDb.Faculty.create(faculty);
const registerAsAdmin = (admin: I_Admin) => userDb.Admin.create(admin);

const loginUser = (email: string, userType: UserType) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (userType) {
    case UserType.admin:
      return userDb.Admin.findOne({ email: email, userType });
    case UserType.superAdmin:
      return userDb.Admin.findOne({ email: email, userType });
    case UserType.staff:
      return userDb.Faculty.findOne({ email: email, userType });
    case UserType.principal:
      return userDb.Faculty.findOne({ email: email, userType });
    case UserType.student:
      return userDb.Student.findOne({ email: email });
    case UserType.teacher:
      return userDb.Teacher.findOne({ email: email });
  }
};

export default {
  registerAsStudent,
  registerAsTeacher,
  registerAsFaculty,
  registerAsAdmin,
  loginUser,
};
