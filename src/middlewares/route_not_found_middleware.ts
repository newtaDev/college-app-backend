import { NextFunction, Request, Response } from 'express';
import { RouteNotFoundException } from '../utils/exceptions/exceptions';

export const routeNotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _notFoundParams = {
    message: 'ROUTE NOT FOUND',
    devMsg: 'This route is not found',
    routeInfo: {
      path: req.path,
      query: req.query,
      param: req.params,
    },
    statuscode: 404,
  };
  next(new RouteNotFoundException(_notFoundParams));
};
