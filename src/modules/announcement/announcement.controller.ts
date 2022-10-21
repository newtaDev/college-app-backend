import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import { s3Services } from '../../shared/services/aws/s3_services';
import { AnnouncementLayoutType } from '../../utils/enums';
import { announcementServices } from './announcement.service';
import { fileServices } from '../../shared/services/file.services';
import { I_AnnouncementFormDataFiles } from './announcement.model';

import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { getModelNameFromUserType } from '../../shared/helpers/mongoose.helper';
import { Types } from 'mongoose';
import { AppKeys } from '../../config/keys/app_keys';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let createAnnouncementBody = req.body;
    const multerFiles = fileServices.convertListOfFilesToObjectWithKeyValues(
      req.files as Express.Multer.File[]
    ) as I_AnnouncementFormDataFiles;
    // validate
    _validateAnnouncementImageFiles(req);
    // single
    if (
      req.body.announcementLayoutType == AnnouncementLayoutType.imageWithText
    ) {
      const fileName = await _uploadAnnouncementImagesToS3(
        multerFiles.imageFile?.at(0)
      );
      createAnnouncementBody = {
        ...createAnnouncementBody,
        imageName: fileName,
      };
    }
    // multiple
    if (
      req.body.announcementLayoutType ==
      AnnouncementLayoutType.multiImageWithText
    ) {
      const imageFileNames: string[] = [];
      const _multipleFiles = multerFiles.multipleFiles as Express.Multer.File[];

      for (let index = 0; index < _multipleFiles.length; index++) {
        const _fileName = await _uploadAnnouncementImagesToS3(
          _multipleFiles.at(index)
        );
        imageFileNames.push(_fileName);
      }
      createAnnouncementBody = {
        ...createAnnouncementBody,
        multipleImages: imageFileNames,
      };
    }
    const _createdOrModifiedBy = <I_CreatedBy | I_LastModifiedBy>{
      userId: new Types.ObjectId(req.user.id),
      userType: req.user.userType,
      modelName: getModelNameFromUserType(req.user.userType),
    };
    /// [req.body] doesnot contain [File] type from formData
    const _announcement = await announcementServices.create({
      ...createAnnouncementBody,
      createdBy: _createdOrModifiedBy,
      lastModifiedBy: _createdOrModifiedBy,
    });
    res.status(201).send(successResponse(_announcement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Announcement creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _createdOrModifiedBy = <I_CreatedBy | I_LastModifiedBy>{
      userId: new Types.ObjectId(req.user.id),
      userType: req.user.userType,
      modelName: getModelNameFromUserType(req.user.userType),
    };
    const _announcement = await announcementServices.updateById(
      req.params.announcementId,
      { ...req.body, lastModifiedBy: _createdOrModifiedBy }
    );
    if (!_announcement) throw Error('Announcement not found');
    res.send(successResponse(_announcement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Announcement Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _announcements = await announcementServices.listAll();
    const announcementsWithUrls = await generateAnnouncementUrls(
      _announcements
    );
    res.send(successResponse(announcementsWithUrls));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Announcement listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllForStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _announcements = await announcementServices.listAllWithForStudents(
      req.query.anounceToClassId as string,
      req.query.showMyClassesOnly === 'true'
    );
    const announcementsWithUrls = await generateAnnouncementUrls(
      _announcements
    );

    res.send(successResponse(announcementsWithUrls));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Student Announcement listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateAnnouncementUrls = async (announcements: any[]) => {
  const announcementsWithUrls: object[] = [];
  for (let index = 0; index < announcements.length; index++) {
    const imageName = await announcements[index].getImageUrl();
    const multipleImages = await announcements[index].getMultipleImageUrls();

    announcementsWithUrls.push({
      ...announcements[index].toObject(),
      imageName,
      multipleImages,
    });
  }
  return announcementsWithUrls;
};
export const getAllForTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _announcements = await announcementServices.listAllWithForTeachers(
      req.query.teacherId as string,
      req.query.showAnnouncementsCreatedByMe === 'true'
    );
    const announcementsWithUrls = await generateAnnouncementUrls(
      _announcements
    );

    res.send(successResponse(announcementsWithUrls));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Student Announcement listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _announcement = await announcementServices.findById(
      req.params.announcementId
    );
    if (!_announcement) throw Error('Announcement not found');
    res.send(successResponse(_announcement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Announcement',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _announcement = await announcementServices.deleteById(
      req.params.announcementId
    );
    if (!_announcement) throw Error('Announcement not found');

    if (_announcement?.imageName) {
      await s3Services.deleteFileFromS3(
        `${AppKeys.aws_s3_anouncemet_folder}${_announcement?.imageName}`
      );
    }

    if (_announcement?.multipleImages) {
      for (
        let index = 0;
        index < _announcement?.multipleImages.length;
        index++
      ) {
        await s3Services.deleteFileFromS3(
          `${AppKeys.aws_s3_anouncemet_folder}${_announcement?.multipleImages[index]}`
        );
      }
    }
    res.send(successResponse(_announcement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Announcement',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
const _validateAnnouncementImageFiles = (req: Request) => {
  const multerFiles = fileServices.convertListOfFilesToObjectWithKeyValues(
    req.files as Express.Multer.File[]
  ) as I_AnnouncementFormDataFiles;

  if (!multerFiles) throw new Error('[ multerFiles ] is Empty');
  if (req.body.announcementLayoutType == AnnouncementLayoutType.imageWithText) {
    if (multerFiles.imageFile?.at(0) == null)
      throw Error('[ imageFile ] filed is required');
  }
  if (
    req.body.announcementLayoutType == AnnouncementLayoutType.multiImageWithText
  ) {
    if (
      multerFiles.multipleFiles == null ||
      multerFiles.multipleFiles.length == 0
    )
      throw Error('[ multipleFiles ] filed is required');
  }
};

const _uploadAnnouncementImagesToS3 = async (
  imageFile: Express.Multer.File | undefined
): Promise<string> => {
  const fileName = fileServices.generatedFileName(
    imageFile?.originalname as string
  );
  const contentType = imageFile?.mimetype as string;
  const resizedImage = await fileServices.resizeImage(imageFile);
  await s3Services.uploadFileToS3({
    file: resizedImage,
    fileName: `${AppKeys.aws_s3_anouncemet_folder}${fileName}`,
    contentType: contentType,
  });
  return fileName;
};

export * as announcementController from './announcement.controller';
