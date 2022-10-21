import bcrypt from 'bcrypt';
import { Response, NextFunction, Request } from 'express';
import { ApiException } from '../../../shared/exceptions/api_exceptions';
import { successResponse } from '../../../shared/interfaces/req_res_interfaces';
import {
  I_JwtOtpPayload,
  I_JwtUserPayload,
} from '../../../shared/services/jwt/jwt_interfaces';
import { authService } from './auth.service';
import { omit } from 'lodash';
import { I_Faculty } from '../faculty/faculty.model';
import { I_Admin } from '../admin/admin.model';
import { I_Student } from '../student/student.model';
import { I_Teacher } from '../teacher/teacher.model';
import { adminUsersList } from '../../../utils/roles';
import { isMongoIdExitsOrValid } from '../../../shared/validators/mongoose.validators';
import { AppKeys } from '../../../config/keys/app_keys';
import { resetPassswordTemplate } from '../../../shared/templates/reset_password_html_temp';
import { jwtServices } from '../../../shared/services/jwt/jwt_services';
import { emailServices } from '../../../shared/services/email.services';
import { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { userService } from '../user.service';
/// Login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const _password = req.body.password;
    const userType = req.body.userType;

    /// login and validate with password
    const _userLoginData = await authService.loginUser({ email, userType });
    if (!_userLoginData) throw Error(`${userType} not found`);
    if (!(await _userLoginData.isPasswordValid(_password)))
      throw new Error("password doesn't match");
    const isAdmin = [...adminUsersList]
      .map(type => type == userType)
      .includes(true);

    /// Get all details of user
    const _user = await userService.getUserDetailsById(
      _userLoginData._id.toString(),
      userType
    );
    if (!_user) throw Error(`${userType} not found`);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user._id.toString(),
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId?.toString(),
      isAdmin: isAdmin,
    };
    const accessToken = jwtServices.createAccessToken(payload);
    const refreshToken = jwtServices.createRefreshToken(payload);
    // snd response
    res.send(
      successResponse({
        accessToken,
        refreshToken,
        user: _user,
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
    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeId,
    });
    const _body = req.body as I_Teacher;
    const _user = await authService.registerAsTeacher(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId?.toString(),
      isAdmin: false,
    };
    const accessToken = jwtServices.createAccessToken(payload);
    const refreshToken = jwtServices.createRefreshToken(payload);
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
    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeId,
      classId: req.body.classId,
    });

    const _body = req.body as I_Student;
    const _user = await authService.registerAsStudent(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId.toString(),
      isAdmin: false,
    };
    const accessToken = jwtServices.createAccessToken(payload);
    const refreshToken = jwtServices.createRefreshToken(payload);
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
    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeId,
    });
    const _body = req.body as I_Faculty;
    const _user = await authService.registerAsFaculty(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId.toString(),
      isAdmin: false,
    };
    const accessToken = jwtServices.createAccessToken(payload);
    const refreshToken = jwtServices.createRefreshToken(payload);
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
    await isMongoIdExitsOrValid({
      collegeId: req.body.collegeId,
    });
    const _body = req.body as I_Admin;
    const _user = await authService.registerAsAdmin(_body);
    //create access and refresh token
    const payload: I_JwtUserPayload = {
      id: _user.id,
      name: _user.name,
      userType: _user.userType,
      collegeId: _user.collegeId?.toString(),
      isAdmin: false,
    };
    const accessToken = jwtServices.createAccessToken(payload);
    const refreshToken = jwtServices.createRefreshToken(payload);
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
export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _user = await userService.getUserWithQuery(req.query);

    if (_user)
      return next(
        new ApiException({
          message: 'Already exits',
          statuscode: 409,
        })
      );
    return res.status(200).send(successResponse());
  } catch (error) {
    return next(
      new ApiException({
        message: 'Username validation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.query.email as string;
    // verify user
    const _user = await userService.getUserWithQuery({ email: email });
    if (!_user) throw new Error('User not found');
    // generate and hash OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    const hashedOtp = await bcrypt.hash(generatedOtp.toString(), 10);
    // create jwt token for OTP
    const otpToken = jwtServices.createOtpToken({
      otp: hashedOtp,
      userId: _user._id.toString(),
      userType: _user.userType,
    });
    // send email to user
    await emailServices.sendEmail({
      from: AppKeys.email_address,
      to: email,
      subject: 'Reset your account password',
      // text: 'Node.js testing mail 3 from tejas ',
      html: resetPassswordTemplate(generatedOtp.toString()),
    });
    return res.status(200).send(successResponse(undefined, { otpToken }));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Forgot password failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const otpToken = req.query.otpToken as string;
    const entredOtp = req.body.otp as string;
    const newPassword = req.body.newPassword as string;
    // verify and decode [otpToken]
    const payload = jwtServices.verifyAndDecodeOtpToken(otpToken) as JwtPayload;
    const otpPayolad = payload.data as I_JwtOtpPayload;
    // verify entred OTP
    if (!(await bcrypt.compare(entredOtp, otpPayolad.otp))) {
      throw new Error('Invalid otp');
    }
    // check user
    const _user = await userService.getUserDetailsById(
      otpPayolad.userId,
      otpPayolad.userType
    );
    if (!_user) throw new Error('User not found');
    // Reset password
    await authService.resetNewPassword(
      _user._id.toString(),
      _user.userType,
      newPassword
    );
    return res.status(200).send(successResponse());
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(
        new ApiException({
          message: 'Reset password failed',
          devMsg: 'OTP expired',
          statuscode: 400,
        })
      );
    }
    return next(
      new ApiException({
        message: 'Reset password failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export * as authController from './auth.controller';
