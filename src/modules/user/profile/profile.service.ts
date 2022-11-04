import { collegeDb } from '../../../config/database/college.db';
import { UserType } from '../../../utils/enums';
import { teacherService } from '../teacher/teacher.service';

export const getProfileDetailsById = async (id: string, userType: UserType) => {
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
        await collegeDb.Student.findById(id).populate([
          {
            path: 'classId',
            populate: {
              path: 'courseId',
            },
          },
        ])
      )?.toObject();

    case UserType.teacher: {
      const teacher = await collegeDb.Teacher.findById(id).populate([
        'accessibleClasses',
      ]);
      return teacherService.generateWithAssignedSubjects(teacher);
    }
  }
};

export const searchUserProfiles = async (searchText: string) => {
  const studentProfiles = await collegeDb.Student.find({
    $or: [
      { name: { $regex: searchText, $options: 'i' } },
      { username: { $regex: searchText, $options: 'i' } },
    ],
  }).limit(4);
  const teacherProfiles = await collegeDb.Teacher.find({
    $or: [
      { name: { $regex: searchText, $options: 'i' } },
      { username: { $regex: searchText, $options: 'i' } },
    ],
  }).limit(3);
  const facultyProfiles = await collegeDb.Faculty.find({
    $or: [
      { name: { $regex: searchText, $options: 'i' } },
      { username: { $regex: searchText, $options: 'i' } },
    ],
  }).limit(3);

  return [...studentProfiles, ...teacherProfiles, ...facultyProfiles];
};

export * as profileServices from './profile.service';
