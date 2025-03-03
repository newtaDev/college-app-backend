import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { ApiException } from '../../../shared/exceptions/api_exceptions';
import { successResponse } from '../../../shared/interfaces/req_res_interfaces';
import {teacherService} from './teacher.service';

export const updateTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _teacher = await teacherService.updateById(
      req.params.teacherId,
      req.body
    );
    if (!_teacher) throw Error('Teacher not found');
    res.send(successResponse(_teacher));
  } catch (error) {
    console.log(error);
    
    return next(
      new ApiException({
        message: 'Teacher Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!_.isEmpty(req.query)) {
      const collegeId = (
        req.query.collegeId ?? req.user.collegeId
      )?.toString() as string;
      const _teachersWithQurey = await teacherService.listAll({
        collegeId,
        ...req.query,
      });
      return res.send(successResponse(_teachersWithQurey));
    }
    const _teacher = await teacherService.listAll();
    res.send(successResponse(_teacher));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Teacher listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const findTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _teacher = await teacherService.findById(req.params.teacherId);
    if (!_teacher) throw Error('Teacher not found');
    res.send(successResponse(_teacher));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Teacher',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAccessibleClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _teacher = await teacherService.getAccessibleClasses(req.user.id);
    if (!_teacher) throw Error('Teacher not found');
    res.send(successResponse(_teacher));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding assigned classes in Teacher',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _teacher = await teacherService.deleteById(req.params.teacherId);
    if (!_teacher) throw Error('Teacher not found');
    res.send(successResponse(_teacher));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Teacher',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
