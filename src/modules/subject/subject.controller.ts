import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import collegeService from '../college/college.service';
import courseService from '../course/course.service';
import subjectService from './subject.service';


export const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _college = await collegeService.findById(req.body.collegeId);
    if (!_college) throw Error("College id doesn't exists");
    const _course = await courseService.findById(req.body.courseId);
    if (!_course) throw Error("Course id doesn't exists");
    if (
      await subjectService.isSubjectAlreadyCreated(
        req.body.name,
        req.body.courseId,
        req.user.collegeId
      )
    ) {
      throw Error('Subject Name Already exists');
    }
    const subject = await subjectService.create(req.body);
    res.status(201).send(successResponse(subject));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const updateSubjectById = async (
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
    await _canSubjectModified(req);
    const subject = await subjectService.updateById(
      req.params.subjectId,
      req.body
    );
    if (!subject) throw Error('Subject not found');
    res.send(successResponse(subject));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _subject = await subjectService.listAll();
    res.send(successResponse(_subject));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Subject listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const findSubjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _subject = await subjectService.findById(req.params.subjectId);
    if (!_subject) throw Error('Subject not found');
    res.send(successResponse(_subject));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Subject',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteSubjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     await _isSubjectBelogsToMyCollege(req);
    const _subject = await subjectService.deleteById(req.params.subjectId);
    res.send(successResponse(_subject));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Subject',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

const _canSubjectModified = async (req: Request) => {
  const _findSubject = await _isSubjectBelogsToMyCollege(req);
  if (req.body.name != null && _findSubject?.name != req.body.name) {
    const _isSubjectAlreadyCreated =
    await subjectService.isSubjectAlreadyCreated(
      req.body.name,
      _findSubject.courseId.toString(),
      req.user.collegeId
      );
      if (_isSubjectAlreadyCreated)
      throw Error('Subject name with same courseId already exists');
    }
  };
  const _isSubjectBelogsToMyCollege = async (req: Request) => {
    const _findSubject = await subjectService.findById(req.params.subjectId);
    if (!_findSubject) throw Error('Subject not found');
  if (_findSubject?.collegeId.toString() != req.user.collegeId)
    throw Error("You can't modify/delete subject of other college");
  return _findSubject;
};
