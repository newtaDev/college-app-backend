import { Request, Response, NextFunction } from 'express';
import {
  ExceptionsOnErrorMiddleware,
  I_ApiErrorRes,
  I_RouteNotFound,
} from '../shared/@types/exceptions';
import { ApiException } from '../shared/exceptions/api_exceptions';
import logger from '../utils/logger';

export function errorMiddleware(
  error: ExceptionsOnErrorMiddleware,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  //mini error stack trace
  const _stackTrace = {
    errorStack: error.errorStack ?? ApiException.getStackTrace(error),
  };
  let _error: I_ApiErrorRes | I_RouteNotFound = {
    status: error.status ?? 'ERROR',
    statuscode: error.statuscode ?? 500,
    message: error.msg ?? 'Internal server error',
    devMsg: error.devMsg ?? error.message,
    // if `error` is instaceOf `Error` class, then only add '_stackTrace'  to `_error` object
    ...(error instanceof Error && _stackTrace),
  };
  logger.debug(error);
  // checks if err obj has any property or methords named as routeInfo
  // this also works
  // if (error.constructor === RouteNotFoundException) {
  if ('routeInfo' in error) {
    _error = { ..._error, routeInfo: error.routeInfo };
  }
  res.status(_error.statuscode).send(_error);
}
