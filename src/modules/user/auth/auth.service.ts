import { FilterQuery } from 'mongoose';
import { collegeDb } from '../../../config/database/college.db';
import { UserType } from '../../../utils/enums';
import { I_Admin } from '../admin.model';
import { I_Faculty } from '../faculty.model';
import { I_Student } from '../student.model';
import { I_Teacher } from '../teacher.model';

const registerAsTeacher = (teacher: I_Teacher) =>
  collegeDb.Teacher.create(teacher);
const registerAsStudent = (student: I_Student) =>
  collegeDb.Student.create(student);
const registerAsFaculty = (faculty: I_Faculty) =>
  collegeDb.Faculty.create(faculty);
const registerAsAdmin = (admin: I_Admin) => collegeDb.Admin.create(admin);

const getCountOfStudents = (collegeId?: string, classId?: string) =>
  collegeDb.Student.find({ collegeId, classId }).count();

const getStudentById = (studentId: string) =>
  collegeDb.Student.findById(studentId).select(['-password', '-__v']);

const loginUser = (email: string, userType: UserType) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (userType) {
    case UserType.admin:
      return collegeDb.Admin.findOne({ email: email, userType });
    case UserType.superAdmin:
      return collegeDb.Admin.findOne({ email: email, userType });
    case UserType.staff:
      return collegeDb.Faculty.findOne({ email: email, userType });
    case UserType.principal:
      return collegeDb.Faculty.findOne({ email: email, userType });
    case UserType.student:
      return collegeDb.Student.findOne({ email: email });
    case UserType.teacher:
      return collegeDb.Teacher.findOne({ email: email });
  }
};

const getUserDetailsById = (id: string, userType: UserType) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (userType) {
    case UserType.admin:
      return collegeDb.Admin.findById(id).select(['-__v', '-password']);
    case UserType.superAdmin:
      return collegeDb.Admin.findById(id).select(['-__v', '-password']);
    case UserType.staff:
      return collegeDb.Faculty.findById(id).select(['-__v', '-password']);
    case UserType.principal:
      return collegeDb.Faculty.findById(id).select(['-__v', '-password']);
    case UserType.student:
      return collegeDb.Student.findById(id).select(['-__v', '-password']);
    case UserType.teacher:
      return collegeDb.Teacher.findById(id).select(['-__v', '-password']);
  }
};

const findOneTeacher = (query: FilterQuery<I_Teacher>) =>
  collegeDb.Teacher.findOne(query);

export default {
  registerAsStudent,
  registerAsTeacher,
  registerAsFaculty,
  registerAsAdmin,
  findOneTeacher,
  loginUser,
  getCountOfStudents,
  getStudentById,
  getUserDetailsById,
};
