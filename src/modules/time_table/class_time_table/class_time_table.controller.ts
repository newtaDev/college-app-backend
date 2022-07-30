import { NextFunction, Request, Response } from 'express';
import { ApiException } from '../../../shared/exceptions/api_exceptions';
import { I_ClassTimeTable } from './class_time_table.model';
import class_time_tableService from './class_time_table.service';
import { successResponse } from '../../../shared/interfaces/req_res_interfaces';
import { isMongoIdExitsOrValid } from '../../../shared/functions/verify_mongo_ids';

export const createClassTimeTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collegeId = req.body.collegeId ?? req.user.collegeId;
    if (!collegeId) throw Error('[body.collegeId]/[user.collegeId] is required');
    const body = {
      ...req.body,
      collegeId,
    } as I_ClassTimeTable;
    await isMongoIdExitsOrValid({
      collegeId: body.collegeId.toString(),
      classId: body.classId.toString(),
      subjectId: body.subjectId.toString(),
      teacherId: body.teacherId.toString(),
    });
    const _classTT = await class_time_tableService.create(body);
    res.status(201).send(successResponse(_classTT));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Class Time Table creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const updateClassTimeTableById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeId,
      classId: req.body.classId,
      subjectId: req.body.subjectId,
      teacherId: req.body.teacherId,
    });
    const _classTT = await class_time_tableService.updateById(
      req.params.classTTid,
      req.body
    );
    if (!_classTT) throw Error('ClassTimeTable not found');
    res.send(successResponse(_classTT));
  } catch (error) {
    return next(
      new ApiException({
        message: 'ClassTimeTable Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllClassTimeTables = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _classTT = await class_time_tableService.listAll();
    res.send(successResponse(_classTT));
  } catch (error) {
    return next(
      new ApiException({
        message: 'ClassTimeTable listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const findClassTimeTableById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _classTT = await class_time_tableService.findById(
      req.params.classTTid
    );
    if (!_classTT) throw Error('ClassTimeTable not found');
    res.send(successResponse(_classTT));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding ClassTimeTable',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteClassTimeTableById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _classTT = await class_time_tableService.deleteById(
      req.params.classTTid
    );
    if (!_classTT) throw Error('ClassTimeTable not found');
    res.send(successResponse(_classTT));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting ClassTimeTable',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
