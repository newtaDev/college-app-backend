import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../../shared/exceptions/api_exceptions';
import { successResponse } from '../../../shared/interfaces/req_res_interfaces';
import studentService from './student.service';

export const updateStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _student = await studentService.updateById(
      req.params.studentId,
      req.body
    );
    if (!_student) throw Error('Student not found');
    res.send(successResponse(_student));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Student Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _student = await studentService.listAll();
    res.send(successResponse(_student));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Student listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const findStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _student = await studentService.findById(req.params.studentId);
    if (!_student) throw Error('Student not found');
    res.send(successResponse(_student));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Student',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _student = await studentService.deleteById(req.params.studentId);
    if (!_student) throw Error('Student not found');
    res.send(successResponse(_student));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Student',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
