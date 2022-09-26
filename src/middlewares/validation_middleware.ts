import { Response, Request, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';
import { ApiException } from '../shared/exceptions/api_exceptions';
import { I_RequestValidator } from '../shared/interfaces/validation_interfaces';
import { multerServices } from '../shared/services/multer_services';

export const validateSchemaMiddleware =
  ({ body, params, query, formDataFiles, formDataFile }: I_RequestValidator) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let schemaType = null;
    try {
      //validate `request`
      schemaType = '[ Body ] ';
      await body?.validateAsync(req.body);
      schemaType = '[ Param ] ';
      await params?.validateAsync(req.params);
      schemaType = '[ Query ] ';
      await query?.validateAsync(req.query);
      schemaType = '[ Form Data File ] ';
      await formDataFile?.validateAsync(req.file);

      schemaType = '[ Form Data Files ] ';
      const multerFiles =
        multerServices.convertListOfFilesToObjectWithKeyValues(
          (req.files || []) as Express.Multer.File[]
        );

      await formDataFiles?.validateAsync(multerFiles);
      next();
    } catch (error) {
      let errorDetails: Joi.ValidationErrorItem[] = [];

      if (error instanceof ValidationError && error && error.details) {
        errorDetails = error.details.map(errorDetail => ({
          message: errorDetail.message,
          path: errorDetail.path,
          type: errorDetail.type,
        }));
      }
      return next(
        new ApiException({
          message: 'Validation failed',
          devMsg: `${schemaType ?? ''}Schema validation failed`,
          statuscode: 422,
          errorDetails: errorDetails,
        })
      );
    }
  };
