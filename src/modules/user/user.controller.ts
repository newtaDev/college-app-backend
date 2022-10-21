import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import { authService } from './auth/auth.service';
import { userService } from './user.service';

export const getUserDetailsFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error('No Token Payload found');
    const _id = req.user.id;
    const _userType = req.user.userType;
    const _user = await userService.getUserDetailsById(_id, _userType);
    if (!_user) throw Error(`${_userType} not found`);
    // snd response
    res.send(successResponse(_user));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Login failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _oldPassword = req.body.oldPassword;
    const _newPassword = req.body.newPassword;
    const userId = req.user.id;
    const userType = req.user.userType;

    /// login and validate with password
    const _user = await authService.loginUser({ userId, userType });
    if (!_user) throw Error(`${userType} not found`);
    if (!(await _user.isPasswordValid(_oldPassword)))
      throw new Error("password doesn't match");
    await authService.resetNewPassword(
      _user._id.toString(),
      userType,
      _newPassword
    );
    return res.status(200).send(successResponse());
  } catch (error) {
    return next(
      new ApiException({
        message: 'Change password failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export * as userController from './user.controller';
