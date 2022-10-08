import { collegeDb } from '../../../config/database/college.db';
import { UserType } from '../../../utils/enums';

export const getProfileDetailsById = (id: string, userType: UserType) => {
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
      return collegeDb.Student.findById(id).populate([
        {
          path: 'classId',
          populate: {
            path: 'courseId',
          },
        },
      ]);
    case UserType.teacher:
      return collegeDb.Teacher.findById(id).populate('assignedClasses','assignedSubjects');
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
