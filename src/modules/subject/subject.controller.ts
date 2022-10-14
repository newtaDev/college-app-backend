import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { isMongoIdExitsOrValid } from '../../shared/validators/mongoose.validators';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import { subjectService } from './subject.service';

export const createSubject = async (
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
      courseId: req.body.courseId,
    });
    if (
      await subjectService.isSubjectAlreadyCreated(
        req.body.name,
        req.body.courseId,
        collegeId
      )
    ) {
      throw Error('Subject Name Already exists');
    }
    const subject = await subjectService.create(body);
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
    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeI,
      courseId: req.body.courseId,
    });
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
    if (!_.isEmpty(req.query)) {
      const _subjectQuery = await subjectService.listAll(req.query);
      return res.send(successResponse(_subjectQuery));
    }
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

// const _getAllSubjectsInCourse = async (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   query: Record<string, any>
// ) => {
//   try {
//     const _resQuery = await subjectService.listAllWithQuery(query);
//     return _resQuery;
//   } catch (error) {
//     throw new ApiException({
//       message: 'Subject Query failed',
//       devMsg: error instanceof Error ? error.message : null,
//       statuscode: 400,
//     });
//   }
// };
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
