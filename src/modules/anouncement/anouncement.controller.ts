import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import { s3Services } from '../../shared/services/aws/s3_services';
import { AnouncementLayoutType } from '../../utils/enums';
import anouncementService from './anouncement.service';
import { v4 as uuid } from 'uuid';
import { multerServices } from '../../shared/services/multer_services';
import { I_AnouncementFormDataFiles } from './anouncement.model';
import { Validators } from '../../utils/validators';

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
    /// [req.body] doesnot contain [File] type from formData
    const _anouncement = await anouncementService.create(createAnouncementBody);
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
    const _anouncement = await anouncementService.updateById(
      req.params.anouncementId,
      req.body
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
    const _anouncement = await anouncementService.listAll();
    res.send(successResponse(_anouncement));
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
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _anouncement = await anouncementService.findById(
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
    const _anouncement = await anouncementService.deleteById(
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
  await s3Services.uploadFileToS3({
    file: imageFile?.buffer,
    fileName: `anouncements/${fileName}`,
    contentType: contentType,
  });
  return fileName;
};

export * as anouncementController from './anouncement.controller';
