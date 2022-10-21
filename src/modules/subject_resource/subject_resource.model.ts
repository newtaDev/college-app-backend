// Model and schema for College

import mongoose, { Model, Schema, Types } from 'mongoose';
import { AppKeys } from '../../config/keys/app_keys';
import { s3Services } from '../../shared/services/aws/s3_services';
import { UserType } from '../../utils/enums';

export interface I_SubjectResource {
  title: string;
  description?: string;
  subjectId: Types.ObjectId;
  collegeId: Types.ObjectId;
  userId: Types.ObjectId;
  comments: I_SubjectResourceComment[];
  attachments: I_SubjectResourceAttachment[];
  isTestData?: boolean;
}
export interface I_SubjectResourceComment {
  userId: Types.ObjectId;
  comment: string;
  modelName: string;
  userType: UserType;
}
export interface I_SubjectResourceAttachment {
  name: string;
  path: string;
  contentType: string;
  size: number;
}
const resourcesSchema = new Schema<I_SubjectResourceAttachment>(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const commentsSchema = new Schema<I_SubjectResourceComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'comments.modelName',
    },
    comment: { type: String, required: true },
    modelName: { type: String, required: true },
    userType: { type: String, enum: UserType, required: true },
  },
  { timestamps: true }
);

interface I_SubjectResourceMethods {
  getAllAttachmentUrls(): Promise<
    (I_SubjectResourceAttachment & { url: string })[]
  >;
}

export type SubjectResourceModel = Model<
  I_SubjectResource,
  unknown,
  I_SubjectResourceMethods
>;

export const subjectResourceSchema = new Schema<
  I_SubjectResource,
  SubjectResourceModel,
  I_SubjectResourceMethods
>(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    collegeId: { type: Schema.Types.ObjectId, required: true },
    subjectId: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    comments: { type: [commentsSchema], default: [], required: true },
    attachments: { type: [resourcesSchema], default: [], required: true },
    isTestData: { type: Boolean, select: false, default: false },
  },
  { timestamps: true }
);

subjectResourceSchema.methods.getAllAttachmentUrls = async function () {
  const _attachmentsWithUrls: (I_SubjectResourceAttachment & { url: string })[] =
    [];
  const _attachments: I_SubjectResourceAttachment[] =
    this.attachments.toObject() || [];
  if (_attachments == null || _attachments.length <= 0) return [];
  for (let index = 0; index < _attachments.length; index++) {
    _attachmentsWithUrls.push({
      ..._attachments[index],
      url: await s3Services.getSignedUrlOfFile(
        `${AppKeys.aws_s3_subject_resources_folder}${
          _attachments?.at(index)?.path
        }`
      ),
    });
  }
  return _attachmentsWithUrls;
};

export const SubjectResource = mongoose.model<I_SubjectResource, SubjectResourceModel>(
  'SubjectResource',
  subjectResourceSchema
);
