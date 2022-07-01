import { NextFunction, Request, Response } from 'express';
import { RouteNotFoundException } from '../shared/exceptions/api_exceptions';
import { I_RouteNotFoundParams } from '../shared/interfaces/params_interfaces';

export const routeNotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _notFoundParams: I_RouteNotFoundParams = {
    message: 'ROUTE NOT FOUND',
    devMsg: 'This route doesn\'t exist',
    routeInfo: {
      method:req.method,
      path: req.path,
      query: req.query,
      param: req.params,
    },
    statuscode: 404,
  };
  next(new RouteNotFoundException(_notFoundParams));
};
