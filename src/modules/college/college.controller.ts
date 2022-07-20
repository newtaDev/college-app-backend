import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import collgeServices from './college.service';

export const createCollege = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college = await collgeServices.create(req.body);
    res.status(201).send(successResponse(college));
  } catch (error) {
    return next(
      new ApiException({
        message: 'College creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const updateCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college = await collgeServices.updateById(
      req.params.collegeId,
      req.body
    );
    if (!college) throw Error('College not found');
    res.send(successResponse(college));
  } catch (error) {
    return next(
      new ApiException({
        message: 'College Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college = await collgeServices.listAll();
    res.send(successResponse(college));
  } catch (error) {
    return next(
      new ApiException({
        message: 'College listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const findCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college = await collgeServices.findById(req.params.collegeId);
    if (!college) throw Error('College not found');
    res.send(successResponse(college));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding College',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const deleteCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college = await collgeServices.deleteById(req.params.collegeId);
    if (!college) throw Error('College not found');
    res.send(successResponse(college));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting College',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
