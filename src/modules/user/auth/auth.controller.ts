import { Response, NextFunction, Request } from 'express';
import { ApiException } from '../../../shared/exceptions/api_exceptions';
import { successResponse } from '../../../shared/interfaces/req_res_interfaces';
import { I_JwtUserPayload } from '../../../shared/services/jwt/jwt_interfaces';
import {
  createAccessToken,
  createRefreshToken,
} from '../../../shared/services/jwt/jwt_service';
import authService from './auth.service';
import { omit } from 'lodash';
import { I_Faculty } from '../faculty.model';
import { I_Admin } from '../admin.model';
import { I_Student } from '../student.model';
import { I_Teacher } from '../teacher.model';

/// Login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _email = req.body.email;
    const _password = req.body.password;
    const _userType = req.body.userType;
    const _user = await authService.loginUser(_email, _userType);
    if (!_user) throw Error(`${_userType} not found`);
    if (!(await _user.isPasswordValid(_password)))
      throw new Error("password doesn't match");
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    // snd response
    res.send(
      successResponse({
        accessToken,
        refreshToken,
        user: omit(_user.toObject(), ['__v', 'password']),
      })
    );
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

/// Registration
export const registerAsTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _body = req.body as I_Teacher;
    const _user = await authService.registerAsTeacher(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    // snd response
    res.status(201).send(
      successResponse({
        accessToken,
        refreshToken,
        user: omit(_user?.toObject(), ['__v', 'password']),
      })
    );
  } catch (error) {
    return next(
      new ApiException({
        message: 'Teacher Registration failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const registerAsStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _body = req.body as I_Student;
    const _user = await authService.registerAsStudent(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    // snd response
    res.status(201).send(
      successResponse({
        accessToken,
        refreshToken,
        user: omit(_user?.toJSON(), ['__v', 'password']),
      })
    );
  } catch (error) {
    return next(
      new ApiException({
        message: 'Student Registration failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const registerAsFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _body = req.body as I_Faculty;
    const _user = await authService.registerAsFaculty(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    // snd response
    res.status(201).send(
      successResponse({
        accessToken,
        refreshToken,
        user: omit(_user?.toJSON(), ['__v', 'password']),
      })
    );
  } catch (error) {
    return next(
      new ApiException({
        message: 'Faculty Registration failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const registerAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _body = req.body as I_Admin;
    const _user = await authService.registerAsAdmin(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    // snd response
    res.status(201).send(
      successResponse({
        accessToken,
        refreshToken,
        user: omit(_user?.toJSON(), ['__v', 'password']),
      })
    );
  } catch (error) {
    return next(
      new ApiException({
        message: 'Admin Registration failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
