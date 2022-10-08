import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { isMongoIdExitsOrValid } from '../../shared/validators/mongoose.validators';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import courseService from '../course/course.service';
import classService from './class.service';

export const createClass = async (
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
    const _course = await courseService.findOne({
      _id: req.body.courseId,
      collegeId: collegeId,
    });
    if (!_course) throw Error("Course id doesn't exists / Invalid CourseId");
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
    const _class = await classService.create(body);
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
    // TODO: validate totalSem and currentSem on update

    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeId,
      courseId: req.body.courseId,
    });
    await _canClassModified(req);
    const _class = await classService.updateById(
      req.params.classId,
      req.user.collegeId as string,
      req.body
    );
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
    let _class;
    if (req.query.showDetails === 'true') {
      _class = await classService.listAllWithDetails(
        req.user.collegeId as string
      );
    } else {
      _class = await classService.listAll(req.user.collegeId as string);
    }
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
    const _class = await classService.findById(
      req.params.classId,
      req.user.collegeId as string
    );
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
    const _class = await classService.deleteById(
      req.params.classId,
      req.user.collegeId as string
    );
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
  const _findClass = await classService.findById(
    req.params.classId,
    req.user.collegeId as string
  );
  if (!_findClass) throw Error('Class not found');
  if (_findClass?.collegeId.toString() != req.user.collegeId)
    throw Error("You can't modify/delete Class of other college");
  return _findClass;
};
