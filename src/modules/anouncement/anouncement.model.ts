import mongoose, { Model, Schema, Types } from 'mongoose';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { s3Services } from '../../shared/services/aws/s3_services';
import { AnouncementLayoutType, AnounceTo, UserType } from '../../utils/enums';

export interface I_Anouncement {
  collegeId: Types.ObjectId;
  title: string;
  description: string;
  anouncementLayoutType: AnouncementLayoutType;
  anounceTo: AnounceTo;
  anounceToClassIds?: Types.ObjectId[];
  imageName?: string;
  multipleImages?: string[];
  createdBy: I_CreatedBy;
  lastModifiedBy: I_LastModifiedBy;
}

const _createdOrModifiedBy = new Schema<I_CreatedBy | I_LastModifiedBy>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
export interface I_AnouncementFormDataFiles {
  imageFile?: Express.Multer.File;
  multipleFiles?: Express.Multer.File[];
}

interface I_AnouncementMethods {
  getImageUrl(): Promise<string> | null;
  getMultipleImageUrls(): Promise<string[] | null>;
}

export type AnouncementModel = Model<
  I_Anouncement,
  unknown,
  I_AnouncementMethods
>;

export const anouncementSchema = new Schema<
  I_Anouncement,
  AnouncementModel,
  I_AnouncementMethods
>(
  {
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: 'College' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    anounceTo: { type: String, enum: AnounceTo, required: true },
    anouncementLayoutType: {
      type: String,
      enum: AnouncementLayoutType,
      required: true,
    },
    anounceToClassIds: { type: [Schema.Types.ObjectId], default: [] },
    imageName: { type: String },
    multipleImages: { type: [String] },
    createdBy: _createdOrModifiedBy,
    lastModifiedBy: _createdOrModifiedBy,
  },
  { timestamps: true }
);

anouncementSchema.methods.getImageUrl = function () {
  return s3Services.getSignedUrlOfFile(this.imageName);
};

anouncementSchema.methods.getMultipleImageUrls = async function () {
  const _multiImages: string[] = [];
  if (this.multipleImages == null) return null;
  for (let index = 0; index < this.multipleImages.length; index++) {
    _multiImages.push(
      await s3Services.getSignedUrlOfFile(this.multipleImages.at(0))
    );
  }
  return _multiImages;
};

export const Anouncement = mongoose.model<I_Anouncement, AnouncementModel>(
  'Anouncement',
  anouncementSchema
);
