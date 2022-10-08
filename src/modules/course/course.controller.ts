import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { isMongoIdExitsOrValid } from '../../shared/validators/mongoose.validators';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import courseService from './course.service';

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collegeId = req.body.collegeId ?? req.user.collegeId;
    if (!collegeId)
      throw Error('[body.collegeId]/[user.collegeId] is required');
    const body = {
      ...req.body,
      collegeId,
    };
    await isMongoIdExitsOrValid({
      collegeId: collegeId,
    });
    if (await courseService.isCourseAlreadyCreated(req.body.name, collegeId)) {
      throw Error('Course Name Already exists');
    }
    const _course = await courseService.create(body);
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
    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeId,
    });
    await _canCourseModified(req);
    const _course = await courseService.updateById(
      req.params.courseId,
      req.body
    );
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
    await _isCourseBelogsToMyCollege(req);
    const _course = await courseService.deleteById(req.params.courseId);
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

const _canCourseModified = async (req: Request) => {
  const _findCourse = await _isCourseBelogsToMyCollege(req);
  if (req.body.name != null && _findCourse?.name != req.body.name) {
    const _isCourseAlreadyCreated = await courseService.isCourseAlreadyCreated(
      req.body.name,
      req.user.collegeId
    );
    if (_isCourseAlreadyCreated) throw Error('Course name already exists');
  }
};
const _isCourseBelogsToMyCollege = async (req: Request) => {
  const _findCourse = await courseService.findById(req.params.courseId);
  if (!_findCourse) throw Error('Course not found');
  if (_findCourse?.collegeId.toString() != req.user.collegeId)
    throw Error("You can't modify/delete Course of other college");
  return _findCourse;
};
