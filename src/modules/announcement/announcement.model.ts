import mongoose, { Model, Schema, Types } from 'mongoose';
import { AppKeys } from '../../config/keys/app_keys';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { s3Services } from '../../shared/services/aws/s3_services';
import { AnnouncementLayoutType, AnounceTo } from '../../utils/enums';
import { createdOrModifiedBySchema } from '../../shared/helpers/mongoose.helper';

export interface I_Announcement {
  collegeId: Types.ObjectId;
  title: string;
  description: string;
  announcementLayoutType: AnnouncementLayoutType;
  anounceTo: AnounceTo;
  anounceToClassIds?: Types.ObjectId[];
  imageName?: string;
  multipleImages?: string[];
  createdBy: I_CreatedBy;
  lastModifiedBy: I_LastModifiedBy;
}

export interface I_AnnouncementFormDataFiles {
  imageFile?: Express.Multer.File[];
  multipleFiles?: Express.Multer.File[];
}

interface I_AnnouncementMethods {
  getImageUrl(): Promise<string> | null;
  getMultipleImageUrls(): Promise<string[]>;
}

export type AnnouncementModel = Model<
  I_Announcement,
  unknown,
  I_AnnouncementMethods
>;

export const announcementSchema = new Schema<
  I_Announcement,
  AnnouncementModel,
  I_AnnouncementMethods
>(
  {
    collegeId: { type: Schema.Types.ObjectId, required: true, ref: 'College' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    anounceTo: { type: String, enum: AnounceTo, required: true },
    announcementLayoutType: {
      type: String,
      enum: AnnouncementLayoutType,
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

announcementSchema.methods.getImageUrl = function () {
  if (this.announcementLayoutType != AnnouncementLayoutType.imageWithText)
    return null;
  return s3Services.getSignedUrlOfFile(
    `${AppKeys.aws_s3_anouncemet_folder}${this.imageName}`
  );
};

announcementSchema.methods.getMultipleImageUrls = async function () {
  const _multiImages: string[] = [];
  if (
    this.multipleImages == null ||
    this.multipleImages.length <= 0 ||
    this.announcementLayoutType != AnnouncementLayoutType.multiImageWithText
  )
    return [];
  for (let index = 0; index < this.multipleImages.length; index++) {
    _multiImages.push(
      await s3Services.getSignedUrlOfFile(
        `${AppKeys.aws_s3_anouncemet_folder}${this.multipleImages.at(
          index
        )}`
      )
    );
  }
  return _multiImages;
};

export const Announcement = mongoose.model<I_Announcement, AnnouncementModel>(
  'Announcement',
  announcementSchema
);
