import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import courseService from './course.service';

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _course = await courseService.create(req.body);
    res.status(201).send(successResponse(_course));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Course creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const updateCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _course = await courseService.updateById(
      req.params.courseId,
      req.body
    );
    if (!_course) throw Error('Course not found');
    res.send(successResponse(_course));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Course Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _course = await courseService.listAll();
    res.send(successResponse(_course));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Course listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const findCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _course = await courseService.findById(req.params.courseId);
    if (!_course) throw Error('Course not found');
    res.send(successResponse(_course));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Course',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _course = await courseService.deleteById(req.params.courseId);
    if (!_course) throw Error('Course not found');
    res.send(successResponse(_course));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Course',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
