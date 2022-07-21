import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import subjectService from './subject.service';

export const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _subject = await subjectService.create(req.body);
    res.status(201).send(successResponse(_subject));
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
    const _subject = await subjectService.updateById(
      req.params.subjectId,
      req.body
    );
    if (!_subject) throw Error('Subject not found');
    res.send(successResponse(_subject));
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
    const _subject = await subjectService.deleteById(req.params.subjectId);
    if (!_subject) throw Error('Subject not found');
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
