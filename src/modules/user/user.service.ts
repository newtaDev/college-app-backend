import { I_Faculty } from './faculty/faculty.model';
import { I_Admin } from './admin/admin.model';
import { I_Student } from './student/student.model';
import { I_Teacher } from './teacher/teacher.model';
import { FilterQuery } from 'mongoose';
import { UserType } from '../../utils/enums';
import { teacherService } from './teacher/teacher.service';
import { collegeDb } from '../../config/database/college.db';

const _populateClassAndCourse = [
  {
    path: 'classId',
    populate: {
      path: 'courseId',
    },
  },
];
export const getUserWithQuery = async (
  query?: FilterQuery<I_Student | I_Admin | I_Faculty | I_Teacher>
) => {
  const student = await collegeDb.Student.findOne(query).populate(
    _populateClassAndCourse
  );
  if (student) return student;
  const teacher = await collegeDb.Teacher.findOne(query);
  if (teacher)
    return await teacherService.generateWithAssignedSubjects(teacher);
  const faculty = await collegeDb.Faculty.findOne(query);
  if (faculty) return faculty;
  const admin = await collegeDb.Admin.findOne(query);
  if (admin) return admin;
  return null;
};

export const getUserDetailsById = async (id: string, userType: UserType) => {
  /// Find using `userType` if multiple `userType` is present in same collection
  switch (userType) {
    case UserType.admin:
      return (await collegeDb.Admin.findById(id))?.toObject();
    case UserType.superAdmin:
      return (await collegeDb.Admin.findById(id))?.toObject();
    case UserType.staff:
      return (await collegeDb.Faculty.findById(id))?.toObject();
    case UserType.student:
      return (
        await collegeDb.Student.findById(id).populate(_populateClassAndCourse)
      )?.toObject();
    case UserType.teacher: {
      const teacher = await collegeDb.Teacher.findById(id).populate([
        'assignedClasses',
      ]);
      return teacherService.generateWithAssignedSubjects(teacher);
    }
  }
};

export * as userService from './user.service';
