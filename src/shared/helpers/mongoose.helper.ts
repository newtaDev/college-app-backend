import { Schema } from 'mongoose';
import { collegeDb } from '../../config/database/college.db';
import { I_CreatedBy, I_LastModifiedBy } from '../interfaces/interfaces';
import { UserType } from '../../utils/enums';

export const getModelNameFromUserType = (userType: UserType): string => {
  switch (userType) {
    case UserType.admin:
    case UserType.superAdmin:
      return collegeDb.Admin.modelName;
    case UserType.staff:
      return collegeDb.Faculty.modelName;
    case UserType.student:
      return collegeDb.Student.modelName;
    case UserType.teacher:
      return collegeDb.Teacher.modelName;
  }
};

export const createdOrModifiedBySchema = (params: { isCreate: boolean }) =>
  new Schema<I_CreatedBy | I_LastModifiedBy>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: params.isCreate
          ? 'createdBy.modelName'
          : 'lastModifiedBy.modelName',
      },
      modelName: {
        type: String,
        required: true,
      },
      userType: {
        type: String,
        enum: UserType,
        required: true,
      },
    },
    { _id: false }
  );
