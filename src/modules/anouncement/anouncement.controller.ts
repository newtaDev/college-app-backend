import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import { s3Services } from '../../shared/services/aws/s3_services';
import { AnouncementLayoutType } from '../../utils/enums';
import { anouncementServices } from './anouncement.service';
import { v4 as uuid } from 'uuid';
import { multerServices } from '../../shared/services/multer_services';
import { I_AnouncementFormDataFiles } from './anouncement.model';
import { Validators } from '../../shared/validators/validators';
import {
  I_CreatedBy,
  I_LastModifiedBy,
} from '../../shared/interfaces/interfaces';
import { getModelNameFromUserType } from '../../utils/helpers';
import { Types } from 'mongoose';
import { AppKeys } from '../../config/keys/app_keys';
import sharp from 'sharp';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let createAnouncementBody = req.body;
    const multerFiles = multerServices.convertListOfFilesToObjectWithKeyValues(
      req.files as Express.Multer.File[]
    ) as I_AnouncementFormDataFiles;
    // validate
    _validateAnouncementImageFiles(req);
    // single
    if (req.body.anouncementLayoutType == AnouncementLayoutType.imageWithText) {
      const fileName = await _uploadAnouncementImagesToS3(
        multerFiles.imageFile
      );
      createAnouncementBody = { ...createAnouncementBody, imageName: fileName };
    }
    // multiple
    if (
      req.body.anouncementLayoutType == AnouncementLayoutType.multiImageWithText
    ) {
      const imageFileNames: string[] = [];
      /// if we send one file in [multipleFiles] then some issues is caused
      /// To solve single file issue in list
      let _multipleFiles = multerFiles.multipleFiles as Express.Multer.File[];
      if (_multipleFiles.length == undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await Validators.isValidImage(multerFiles.multipleFiles as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _multipleFiles = [multerFiles.multipleFiles as any];
      }

      for (let index = 0; index < _multipleFiles.length; index++) {
        const _fileName = await _uploadAnouncementImagesToS3(
          _multipleFiles.at(index)
        );
        imageFileNames.push(_fileName);
      }
      createAnouncementBody = {
        ...createAnouncementBody,
        multipleImages: imageFileNames,
      };
    }
    const _createdOrModifiedBy = <I_CreatedBy | I_LastModifiedBy>{
      userId: new Types.ObjectId(req.user.id),
      userType: req.user.userType,
      modelName: getModelNameFromUserType(req.user.userType),
    };
    /// [req.body] doesnot contain [File] type from formData
    const _anouncement = await anouncementServices.create({
      ...createAnouncementBody,
      createdBy: _createdOrModifiedBy,
      lastModifiedBy: _createdOrModifiedBy,
    });
    res.status(201).send(successResponse(_anouncement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Anouncement creation failed',
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
    const _anouncement = await anouncementServices.updateById(
      req.params.anouncementId,
      { ...req.body, lastModifiedBy: _createdOrModifiedBy }
    );
    if (!_anouncement) throw Error('Anouncement not found');
    res.send(successResponse(_anouncement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Anouncement Updation failed',
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
    const _anouncements = await anouncementServices.listAll();
    const anouncementsWithUrls = await generateAnouncementUrls(_anouncements);
    res.send(successResponse(anouncementsWithUrls));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Anouncement listing failed',
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
    const _anouncements = await anouncementServices.listAllWithForStudents(
      req.query.anounceToClassId as string,
      req.query.showMyClassesOnly === 'true'
    );
    const anouncementsWithUrls = await generateAnouncementUrls(_anouncements);

    res.send(successResponse(anouncementsWithUrls));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Student Anouncement listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateAnouncementUrls = async (anouncements: any[]) => {
  const anouncementsWithUrls: object[] = [];
  for (let index = 0; index < anouncements.length; index++) {
    const imageName = await anouncements[index].getImageUrl();
    const multipleImages = await anouncements[index].getMultipleImageUrls();

    anouncementsWithUrls.push({
      ...anouncements[index].toObject(),
      imageName,
      multipleImages,
    });
  }
  return anouncementsWithUrls;
};
export const getAllForTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _anouncements = await anouncementServices.listAllWithForTeachers(
      req.query.teacherId as string,
      req.query.showAnouncementsCreatedByMe === 'true'
    );
    const anouncementsWithUrls = await generateAnouncementUrls(_anouncements);

    res.send(successResponse(anouncementsWithUrls));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Student Anouncement listing failed',
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
    const _anouncement = await anouncementServices.findById(
      req.params.anouncementId
    );
    if (!_anouncement) throw Error('Anouncement not found');
    res.send(successResponse(_anouncement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Anouncement',
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
    const _anouncement = await anouncementServices.deleteById(
      req.params.anouncementId
    );
    if (!_anouncement) throw Error('Anouncement not found');

    if (_anouncement?.imageName) {
      await s3Services.deleteFileFromS3(
        `anouncements/${_anouncement?.imageName}`
      );
    }

    if (_anouncement?.multipleImages) {
      for (
        let index = 0;
        index < _anouncement?.multipleImages.length;
        index++
      ) {
        await s3Services.deleteFileFromS3(
          `anouncements/${_anouncement?.multipleImages[index]}`
        );
      }
    }
    res.send(successResponse(_anouncement));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Anouncement',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
const _validateAnouncementImageFiles = (req: Request) => {
  const multerFiles = multerServices.convertListOfFilesToObjectWithKeyValues(
    req.files as Express.Multer.File[]
  ) as I_AnouncementFormDataFiles;

  if (!multerFiles) throw new Error('[ multerFiles ] is Empty');
  if (req.body.anouncementLayoutType == AnouncementLayoutType.imageWithText) {
    if (multerFiles.imageFile == null)
      throw Error('[ imageFile ] filed is required');
  }
  if (
    req.body.anouncementLayoutType == AnouncementLayoutType.multiImageWithText
  ) {
    if (
      multerFiles.multipleFiles == null ||
      multerFiles.multipleFiles.length == 0
    )
      throw Error('[ multipleFiles ] filed is required');
  }
};
const _generateFileName = (fileName: string) => `${uuid()}-${fileName}`;

const _uploadAnouncementImagesToS3 = async (
  imageFile: Express.Multer.File | undefined
): Promise<string> => {
  const fileName = _generateFileName(imageFile?.originalname as string);
  const contentType = imageFile?.mimetype as string;
  const resizedImage = await _resizeImage(imageFile);
  await s3Services.uploadFileToS3({
    file: resizedImage,
    fileName: `${AppKeys.aws_s3_anouncemet_folder_name}${fileName}`,
    contentType: contentType,
  });
  return fileName;
};

const _resizeImage = (imageFile: Express.Multer.File | undefined) => {
  const sizeInMb = (imageFile?.size || 0) / (1024 * 1024);
  let resizeImageQuality = 40;
  if (sizeInMb >= 2) {
    resizeImageQuality = 25;
  }
  return sharp(imageFile?.buffer)
    .jpeg({ progressive: true, force: false, quality: resizeImageQuality })
    .png({ progressive: true, force: false, quality: resizeImageQuality })
    .webp({ force: false, quality: resizeImageQuality })
    .toBuffer();
};

export * as anouncementController from './anouncement.controller';
