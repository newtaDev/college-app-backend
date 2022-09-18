import { collegeDb } from '../../../config/database/college.db';
import { UserType } from '../../../utils/enums';

const getProfileDetailsById = (id: string, userType: UserType) => {
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
      return collegeDb.Student.findById(id)
        .select(['-__v', '-password'])
        .populate([
          {
            path: 'classId',
            populate: {
              path: 'courseId',
            },
          },
        ]);
    case UserType.teacher:
      return collegeDb.Teacher.findById(id)
        .select(['-__v', '-password'])
        .populate('assignedClasses');
  }
};

export default {
  getProfileDetailsById,
};
