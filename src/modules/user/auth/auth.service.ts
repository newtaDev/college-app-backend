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
const _hidePassword = ['-__v', '-password'];
const registerAsTeacher = (teacher: I_Teacher) =>
  collegeDb.Teacher.create(teacher);
const registerAsStudent = (student: I_Student) =>
  collegeDb.Student.create(student);
const registerAsFaculty = (faculty: I_Faculty) =>
  collegeDb.Faculty.create(faculty);
const registerAsAdmin = (admin: I_Admin) => collegeDb.Admin.create(admin);

const getUserWithQuery = async (
  query?: FilterQuery<I_Student | I_Admin | I_Faculty | I_Teacher>
) => {
  const student = await collegeDb.Student.findOne(query)
    .select(_hidePassword)
    .populate(_populateStudent);
  if (student) return student;
  const teacher = await collegeDb.Teacher.findOne(query)
    .select(_hidePassword)
    .populate('assignedClasses');
  if (teacher) return teacher;
  const faculty = await collegeDb.Faculty.findOne(query).select(_hidePassword);
  if (faculty) return faculty;
  const admin = await collegeDb.Admin.findOne(query).select(_hidePassword);
  if (admin) return admin;
  return null;
};

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
      return collegeDb.Student.findOne({ email: email }).populate(
        _populateStudent
      );
    case UserType.teacher:
      return collegeDb.Teacher.findOne({ email: email }).populate(
        'assignedClasses'
      );
  }
};

const getUserDetailsById = (id: string, userType: UserType) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (userType) {
    case UserType.admin:
      return collegeDb.Admin.findById(id).select(_hidePassword);
    case UserType.superAdmin:
      return collegeDb.Admin.findById(id).select(_hidePassword);
    case UserType.staff:
      return collegeDb.Faculty.findById(id).select(_hidePassword);
    case UserType.principal:
      return collegeDb.Faculty.findById(id).select(_hidePassword);
    case UserType.student:
      return collegeDb.Student.findById(id)
        .select(_hidePassword)
        .populate(_populateStudent);
    case UserType.teacher:
      return collegeDb.Teacher.findById(id)
        .select(_hidePassword)
        .populate('assignedClasses');
  }
};

export default {
  registerAsStudent,
  registerAsTeacher,
  registerAsFaculty,
  registerAsAdmin,
  loginUser,
  getUserDetailsById,
  getUserWithQuery,
};
