import { Request, Response, NextFunction } from 'express';
import { AppKeys } from '../../config/keys/app_keys';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { getModelNameFromUserType } from '../../shared/helpers/mongoose.helper';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import { s3Services } from '../../shared/services/aws/s3_services';
import { fileServices } from '../../shared/services/file.services';
import {
  I_SubjectResource,
  I_SubjectResourceComment,
  I_SubjectResourceAttachment,
} from './subject_resource.model';
import { subjectPostService } from './subject_resource.service';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let body: I_SubjectResource = {
      ...req.body,
      collegeId: req.body.collegeId ?? req.user.collegeId,
    };
    const attachments =
      (fileServices.convertListOfFilesToObjectWithKeyValues(
        req.files as Express.Multer.File[]
      ).attachments as Express.Multer.File[]) || [];
    checkFileSize(attachments);
    const uploadedAttachments: I_SubjectResourceAttachment[] = [];
    for (let index = 0; index < attachments.length; index++) {
      const file = attachments[index];
      const genName = await _uploadAttachmentsToS3(file);
      uploadedAttachments.push({
        contentType: file.mimetype,
        name: file.originalname,
        path: genName,
        size: file.size,
      });
    }
    body = {
      ...body,
      attachments: uploadedAttachments,
    };

    const _subjectResource = await subjectPostService.create(body);
    res.status(201).send(successResponse(_subjectResource));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject resource creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentBody = _generateModelNameForComment(req.body);
    const _subjectResource = await subjectPostService.updateById(
      req.params.resourceId,
      {
        $push: { comments: commentBody },
      }
    );
    res.status(200).send(successResponse(_subjectResource));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject resource creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

const checkFileSize = (files: Express.Multer.File[]) => {
  for (let index = 0; index < files.length; index++) {
    const sizeInMb = files[index].size / (1024 * 1024);
    if (sizeInMb > 50)
      throw new Error('File size should not be greater than 50 mb');
  }
};

const _uploadAttachmentsToS3 = async (
  file: Express.Multer.File
): Promise<string> => {
  const fileName = fileServices.generatedFileName(file?.originalname as string);
  const contentType = file?.mimetype as string;
  /// rezie and upload if image
  if (fileServices.imgFileFormats.includes(file?.mimetype as string)) {
    const resizedImage = await fileServices.resizeImage(file);
    await s3Services.uploadFileToS3({
      file: resizedImage,
      fileName: `${AppKeys.aws_s3_subject_resources_folder}${fileName}`,
      contentType: contentType,
    });
    return fileName;
  }
  await s3Services.uploadFileToS3({
    file: file?.buffer,
    fileName: `${AppKeys.aws_s3_subject_resources_folder}${fileName}`,
    contentType: contentType,
  });
  return fileName;
};

const _generateModelNameForComment = (
  comment: I_SubjectResourceComment
): I_SubjectResourceComment => ({
  comment: comment.comment,
  userId: comment.userId,
  userType: comment.userType,
  modelName: getModelNameFromUserType(comment.userType),
});
export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _subjectResource = await subjectPostService.updateById(
      req.params.resourceId,
      req.body
    );
    if (!_subjectResource) throw Error('Subject resource not found');
    res.send(successResponse(_subjectResource));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject resource Updation failed',
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
    const _subjectResource = await subjectPostService.listAll();
    res.send(successResponse(_subjectResource));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject resource listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const getAllSubjectResourcesWithCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _resources = await subjectPostService.getAllSubjectResources(
      req.query.subjectId as string
    );
    const resData = [];
    for (let index = 0; index < _resources.length; index++) {
      resData.push({
        ..._resources[index].toObject(),
        comments: [],
        attachments: [],
        totalComments: _resources[index].comments.length,
        totalAttachments: _resources[index].attachments.length,
      });
    }
    res.send(successResponse(resData));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject resource listing failed',
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
    const _subjectResource = await subjectPostService.findById(req.params.resourceId);
    if (!_subjectResource) throw Error('Subject resource not found');
    const attachments = (await _subjectResource?.getAllAttachmentUrls()) || [];
    const resData: I_SubjectResource = {
      ..._subjectResource.toObject(),
      attachments,
    };
    res.send(successResponse(resData));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Subject resource',
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
    const _subjectResource = await subjectPostService.deleteById(req.params.resourceId);
    if (!_subjectResource) throw Error('Subject resource not found');
    res.send(successResponse(_subjectResource));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Subject resource',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _subjectResource = await subjectPostService.deleteCommentById(
      req.params.resourceId,
      req.params.commentId
    );
    if (!_subjectResource) throw Error('Subject resource not found');
    res.send(successResponse(_subjectResource));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Subject resource',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export * as subjectPostController from './subject_resource.controller';
