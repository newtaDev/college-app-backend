import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import collegeService from '../college/college.service';
import courseService from '../course/course.service';
import classService from './class.service';

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _college = await collegeService.findById(req.body.collegeId);
    if (!_college) throw Error("College id doesn't exists");
    const _course = await courseService.findById(req.body.courseId);
    if (!_course) throw Error("Course id doesn't exists");
    if (req.body.currentSem <= 0 || req.body.currentSem > _course.totalSem)
      throw Error(`currentSem must be in between 1 - ${_course.totalSem}`);
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
    /// only check if collegeId updated
    if (req.body.collegeId) {
      const _college = await collegeService.findById(req.body.collegeId);
      if (!_college) throw Error("College id doesn't exists");
    }
    /// only check if courseId updated
    if (req.body.courseId) {
      const _course = await courseService.findById(req.body.courseId);
      if (!_course) throw Error("Course id doesn't exists");
    }
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
    await _isClassBelogsToMyCollege(req);
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
    if (!_findClass) throw Error('Class not found');
  if (_findClass?.collegeId.toString() != req.user.collegeId)
    throw Error("You can't modify/delete Class of other college");
  return _findClass;
};
