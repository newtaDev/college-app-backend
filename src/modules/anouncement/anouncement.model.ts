import mongoose, { Model, Schema, Types } from 'mongoose';
import { AppKeys } from '../../config/keys/app_keys';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { s3Services } from '../../shared/services/aws/s3_services';
import { AnouncementLayoutType, AnounceTo } from '../../utils/enums';
import { createdOrModifiedBySchema } from '../../shared/helpers/mongoose.helper';

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

export interface I_AnouncementFormDataFiles {
  imageFile?: Express.Multer.File;
  multipleFiles?: Express.Multer.File[];
}

interface I_AnouncementMethods {
  getImageUrl(): Promise<string> | null;
  getMultipleImageUrls(): Promise<string[]>;
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
    createdBy: createdOrModifiedBySchema({ isCreate: true }),
    lastModifiedBy: createdOrModifiedBySchema({ isCreate: false }),
  },
  { timestamps: true }
);

anouncementSchema.methods.getImageUrl = function () {
  if (this.anouncementLayoutType != AnouncementLayoutType.imageWithText)
    return null;
  return s3Services.getSignedUrlOfFile(
    `${AppKeys.aws_s3_anouncemet_folder_name}${this.imageName}`
  );
};

anouncementSchema.methods.getMultipleImageUrls = async function () {
  const _multiImages: string[] = [];
  if (
    this.multipleImages == null ||
    this.multipleImages.length <= 0 ||
    this.anouncementLayoutType != AnouncementLayoutType.multiImageWithText
  )
    return [];
  for (let index = 0; index < this.multipleImages.length; index++) {
    _multiImages.push(
      await s3Services.getSignedUrlOfFile(
        `${AppKeys.aws_s3_anouncemet_folder_name}${this.multipleImages.at(
          index
        )}`
      )
    );
  }
  return _multiImages;
};

export const Anouncement = mongoose.model<I_Anouncement, AnouncementModel>(
  'Anouncement',
  anouncementSchema
);
