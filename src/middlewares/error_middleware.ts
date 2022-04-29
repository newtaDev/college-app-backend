import { Request, Response, NextFunction } from 'express';
import { ExceptionsOnErrorMiddleware } from '../utils/interfaces/@types/common';
import {
  I_ResFailure,
  I_RouteNotFound,
} from '../utils/interfaces/exceptions_interface';

export function errorMiddleware(
  error: ExceptionsOnErrorMiddleware,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const _errorStack = error.stack?.split('(');
  let _error: I_ResFailure | I_RouteNotFound = {
    status: error.status,
    statuscode: error.statuscode,
    message: error.message,
    devMsg: error.devMsg,
    errorstack: {
      info: _errorStack?.at(0),
      path: _errorStack?.at(1)?.split('src').at(-1)?.split(')').at(0),
    },
  };
  // if (error.constructor === RouteNotFoundException) { // also works

  //check if err obj has any property or methords named as routeInfo
  if ('routeInfo' in error) {
    _error = { ..._error, routeInfo: error.routeInfo };
  }
  res.status(error.statuscode).send(_error);
}
