import { FilterQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { UserType } from '../../../utils/enums';
import { I_Admin } from '../admin.model';
import { I_Faculty } from '../faculty.model';
import { I_Student } from '../student/student.model';
import { I_Teacher } from '../teacher/teacher.model';

const _populateStudent = [
  {
    path: 'classId',
    populate: {
      path: 'courseId',
    },
  },
];
export const registerAsTeacher = (teacher: I_Teacher) =>
  collegeDb.Teacher.create(teacher);
export const registerAsStudent = (student: I_Student) =>
  collegeDb.Student.create(student);
export const registerAsFaculty = (faculty: I_Faculty) =>
  collegeDb.Faculty.create(faculty);
export const registerAsAdmin = (admin: I_Admin) =>
  collegeDb.Admin.create(admin);

export const getUserWithQuery = async (
  query?: FilterQuery<I_Student | I_Admin | I_Faculty | I_Teacher>
) => {
  const student = await collegeDb.Student.findOne(query).populate(
    _populateStudent
  );
  if (student) return student;
  const teacher = await collegeDb.Teacher.findOne(query).populate(
    'assignedClasses'
  );
  if (teacher) return teacher;
  const faculty = await collegeDb.Faculty.findOne(query);
  if (faculty) return faculty;
  const admin = await collegeDb.Admin.findOne(query);
  if (admin) return admin;
  return null;
};

export const loginUser = (email: string, userType: UserType) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (userType) {
    case UserType.admin:
      return collegeDb.Admin.findOne({ email: email, userType }).select(
        'password'
      );
    case UserType.superAdmin:
      return collegeDb.Admin.findOne({ email: email, userType }).select(
        'password'
      );
    case UserType.staff:
      return collegeDb.Faculty.findOne({ email: email, userType }).select(
        'password'
      );
    case UserType.principal:
      return collegeDb.Faculty.findOne({ email: email, userType }).select(
        'password'
      );
    case UserType.student:
      return collegeDb.Student.findOne({ email: email }).select('password');
    case UserType.teacher:
      return collegeDb.Teacher.findOne({ email: email }).select('password');
  }
};

export const getUserDetailsById = (id: string, userType: UserType) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (userType) {
    case UserType.admin:
      return collegeDb.Admin.findById(id);
    case UserType.superAdmin:
      return collegeDb.Admin.findById(id);
    case UserType.staff:
      return collegeDb.Faculty.findById(id);
    case UserType.principal:
      return collegeDb.Faculty.findById(id);
    case UserType.student:
      return collegeDb.Student.findById(id).populate(_populateStudent);
    case UserType.teacher:
      return collegeDb.Teacher.findById(id).populate('assignedClasses');
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
