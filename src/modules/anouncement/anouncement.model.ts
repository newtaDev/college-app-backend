import mongoose, { Model, Schema, Types } from 'mongoose';
import { s3Services } from '../../shared/services/aws/s3_services';
import { AnouncementLayoutType, AnounceTo } from '../../utils/enums';

export interface I_Anouncement {
  collegeId: Types.ObjectId;
  title: string;
  description: string;
  anouncementLayoutType: AnouncementLayoutType;
  anounce_to: AnounceTo;
  anounce_to_classIds?: Types.ObjectId[];
  imageName?: string;
  multipleImages?: string[];
}
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
>({
  collegeId: { type: Schema.Types.ObjectId, required: true, ref: 'College' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  anounce_to: { type: String, enum: AnounceTo, required: true },
  anouncementLayoutType: {
    type: String,
    enum: AnouncementLayoutType,
    required: true,
  },
  anounce_to_classIds: { type: [Schema.Types.ObjectId], default: [] },
  imageName: { type: String },
  multipleImages: { type: [String] },
});

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
