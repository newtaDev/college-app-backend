import { collegeDb } from '../../../config/database/college.db';
import { UserType } from '../../../utils/enums';
import { I_Admin } from '../admin/admin.model';
import { I_Faculty } from '../faculty/faculty.model';
import { I_Student } from '../student/student.model';
import { I_Teacher } from '../teacher/teacher.model';

export const registerAsTeacher = (teacher: I_Teacher) =>
  collegeDb.Teacher.create(teacher);
export const registerAsStudent = (student: I_Student) =>
  collegeDb.Student.create(student);
export const registerAsFaculty = (faculty: I_Faculty) =>
  collegeDb.Faculty.create(faculty);
export const registerAsAdmin = (admin: I_Admin) =>
  collegeDb.Admin.create(admin);


export const loginUser = (params: {
  email?: string;
  userId?: string;
  userType: UserType;
}) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (params.userType) {
    case UserType.admin:
      return collegeDb.Admin.findOne({
        ...(params.email && { email: params.email }),
        ...(params.userId && { _id: params.userId }),
        userType: params.userType,
      }).select('password');
    case UserType.superAdmin:
      return collegeDb.Admin.findOne({
        ...(params.email && { email: params.email }),
        ...(params.userId && { _id: params.userId }),
        userType: params.userType,
      }).select('password');
    case UserType.staff:
      return collegeDb.Faculty.findOne({
        ...(params.email && { email: params.email }),
        ...(params.userId && { _id: params.userId }),
        userType: params.userType,
      }).select('password');
    case UserType.principal:
      return collegeDb.Faculty.findOne({
        ...(params.email && { email: params.email }),
        ...(params.userId && { _id: params.userId }),
        userType: params.userType,
      }).select('password');
    case UserType.student:
      return collegeDb.Student.findOne({
        ...(params.email && { email: params.email }),
        ...(params.userId && { _id: params.userId }),
        userType: params.userType,
      }).select('password');
    case UserType.teacher:
      return collegeDb.Teacher.findOne({
        ...(params.email && { email: params.email }),
        ...(params.userId && { _id: params.userId }),
        userType: params.userType,
      }).select('password');
  }
};

export const resetNewPassword = (
  id: string,
  userType: UserType,
  newPassword: string
) => {
  const updatedData = { password: newPassword };
  switch (userType) {
    case UserType.admin:
      return collegeDb.Admin.findOneAndUpdate({ _id: id }, updatedData);
    case UserType.superAdmin:
      return collegeDb.Admin.findOneAndUpdate({ _id: id }, updatedData);
    case UserType.staff:
      return collegeDb.Faculty.findOneAndUpdate({ _id: id }, updatedData);
    case UserType.principal:
      return collegeDb.Faculty.findOneAndUpdate({ _id: id }, updatedData);
    case UserType.student:
      return collegeDb.Student.findOneAndUpdate({ _id: id }, updatedData);
    case UserType.teacher:
      return collegeDb.Teacher.findOneAndUpdate({ _id: id }, updatedData);
  }
};
export * as authService from './auth.service';
