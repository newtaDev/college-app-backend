import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/database/db';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import courseService from '../course/course.service';
import subjectService from './subject.service';

export const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const course = await db.Course.findOneAndUpdate(
      {
        _id: subject.courseId,
        collegeId: subject.collegeId,
      },
      {
        $push: {
          ...(subject.isMainSubject && { mainSubjectIds: subject.id }),
          ...(!subject.isMainSubject && { optionalSubjectIds: subject.id }),
        },
      },
      { new: true }
    );
    if (!course) {
      await subjectService.deleteById(subject.id);
      throw Error('Invalid courseId');
    }

    res.status(201).send(successResponse({ subject, course }));
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
    await _canSubjectModified(req);
    const subject = await subjectService.updateById(
      req.params.subjectId,
      req.body
    );
    if (!subject) throw Error('Subject not found');
    const course = await courseService.removeAndInsertSubjectIdToCourse(
      subject
    );
    res.send(successResponse({ subject, course }));
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
    const _findSubject = await _isSubjectBelogsToMyCollege(req);
    if (!_findSubject) throw Error('Subject not found');
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
  if (!_findSubject) throw Error('Subject not found');
  if (req.body.name != null && _findSubject?.name != req.body.name) {
    const _isSubjectAlreadyCreated =
      await subjectService.isSubjectAlreadyCreated(
        req.body.name,
        _findSubject.courseId,
        req.user.collegeId
      );
    if (_isSubjectAlreadyCreated)
      throw Error('Subject name with same courseId already exists');
  }
};
const _isSubjectBelogsToMyCollege = async (req: Request) => {
  const _findSubject = await subjectService.findById(req.params.subjectId);
  if (_findSubject?.collegeId != req.user.collegeId)
    throw Error("You can't modify/delete subject of other college");
  return _findSubject;
};
