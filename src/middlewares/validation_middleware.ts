import { Response, Request, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';
import { ApiException } from '../shared/exceptions/api_exceptions';
import { I_RequestValidator } from '../shared/interfaces/validation_interfaces';

export const validateSchemaMiddleware =
  ({ body, params, query }: I_RequestValidator) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let schemaType = null;
    try {
      //validate `request`
      schemaType = 'Body ';
      await body?.validateAsync(req.body);
      schemaType = 'Param ';
      await params?.validateAsync(req.params);
      schemaType = 'Query ';
      await query?.validateAsync(req.query);
      next();
    } catch (error) {
      let errorDetails: Joi.ValidationErrorItem[] = [];

      if (error instanceof ValidationError && error && error.details) {
        errorDetails = error.details;
      }
      return next(
        new ApiException({
          message: `${schemaType ?? ''}Schema validation failed`,
          devMsg: error instanceof Error ? error.message : null,
          statuscode: 404,
          errorDetails: errorDetails,
        })
      );
    }
  };
