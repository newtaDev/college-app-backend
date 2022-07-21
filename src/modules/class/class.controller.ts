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
    if (
      await classService.isClassAlreadyCreated(
        req.body.name,
        req.body.collegeId
      )
    ) {
      throw Error('Class Name Already exists');
    }
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
    await _canClassModified(req);
    const _class = await classService.updateById(req.params.classId, req.body);
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
    const _findClass = await _isClassBelogsToMyCollege(req);
    if (!_findClass) throw Error('Class not found');
    const _class = await classService.deleteById(req.params.classId);
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

/// First checks if college is same?
/// then if `name` field changed then checks for the availablity of the name
const _canClassModified = async (req: Request) => {
  const _findClass = await _isClassBelogsToMyCollege(req);
  if (!_findClass) throw Error('Class not found');
  if (req.body.name != null && _findClass?.name != req.body.name) {
    const _isClassAlreadyCreated = await classService.isClassAlreadyCreated(
      req.body.name,
      req.user.collegeId
    );
    if (_isClassAlreadyCreated) throw Error('Class name already exists');
  }
};
const _isClassBelogsToMyCollege = async (req: Request) => {
  const _findClass = await classService.findById(req.params.classId);
  if (_findClass?.collegeId != req.user.collegeId)
    throw Error("You can't modify/delete Class of other college");
  return _findClass;
};
