import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../../shared/exceptions/api_exceptions';
import { successResponse } from '../../../shared/interfaces/req_res_interfaces';
import { UserType } from '../../../utils/enums';
import profileService from './profile.service';

export const getUserProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _user = await profileService.getProfileDetailsById(
      req.params.userId,
      req.query.userType as UserType
    );
    if (!_user) throw Error('User not found');
    res.send(successResponse(_user));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding User',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
