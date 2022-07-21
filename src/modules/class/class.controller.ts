import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import classService from './class.service';

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _class = await classService.create(req.body);
    res.status(201).send(successResponse(_class));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Class creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const updateClassById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _class = await classService.updateById(req.params.classId, req.body);
    if (!_class) throw Error('Class not found');
    res.send(successResponse(_class));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Class Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _class = await classService.listAll();
    res.send(successResponse(_class));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Class listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const findClassById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _class = await classService.findById(req.params.classId);
    if (!_class) throw Error('Class not found');
    res.send(successResponse(_class));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Class',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteClassById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _class = await classService.deleteById(req.params.classId);
    if (!_class) throw Error('Class not found');
    res.send(successResponse(_class));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Class',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
