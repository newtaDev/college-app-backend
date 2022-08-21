import { Request, Response, NextFunction } from 'express';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import authService from '../user/auth/auth.service';
import attendanceService from './attendance.service';

export const createAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _attendance = await attendanceService.create(req.body);
    res.status(201).send(successResponse(_attendance));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Attendance creation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const updateAttendanceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _attendance = await attendanceService.updateById(
      req.params.attendanceId,
      req.body
    );
    if (!_attendance) throw Error('Attendance not found');
    res.send(successResponse(_attendance));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Attendance Updation failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAllAttendances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _attendance = await attendanceService.listAll();
    res.send(successResponse(_attendance));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Attendance listing failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const getAttendancesReportOfSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collegeId = (
      req.query.collegeId ?? req.user.collegeId
    )?.toString() as string;
    const classId = req.query.classId?.toString() as string;
    const currentSem = Number(req.query.currentSem);
    const totalStudentsInClass = await authService.getCountOfStudents(
      collegeId,
      classId
    );
    const classSubjectsReport =
      await attendanceService.getReportOfAllSubjectsInClass(
        collegeId,
        classId,
        currentSem,
        totalStudentsInClass
      );

    res.send(successResponse(classSubjectsReport));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Attendance Report of Subject failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
export const getAbsentStudentsReportInEachSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collegeId = (
      req.query.collegeId ?? req.user.collegeId
    )?.toString() as string;
    const classId = req.query.classId?.toString() as string;
    const subjectId = req.query.subjectId?.toString() as string;
    const currentSem = Number(req.query.currentSem);

    /// get Absent studets of perticular subject
    /// we only get [studentId] and [absent_classes] count in res
    const classAbsentStudentsReport =
      await attendanceService.getAbsentStudentsReportInEachSubject(
        collegeId,
        classId,
        subjectId,
        currentSem
      );

    // /// iterate on studentId's to get student details
    // const classAbsentStudents: AbsentStudents[] = [];
    // for (let i = 0; i < classAbsentStudentsReport.length; i++) {
    //   classAbsentStudents.push({
    //     student: await authService.getStudentById(
    //       classAbsentStudentsReport[i].studentId
    //     ),
    //     absent_classes: classAbsentStudentsReport[i].absent_classes,
    //   });
    // }

    res.send(successResponse(classAbsentStudentsReport));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Absent Student Reporting failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const findAttendanceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _attendance = await attendanceService.findById(
      req.params.attendanceId
    );
    if (!_attendance) throw Error('Attendance not found');
    res.send(successResponse(_attendance));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in finding Attendance',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const deleteAttendanceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _attendance = await attendanceService.deleteById(
      req.params.attendanceId
    );
    if (!_attendance) throw Error('Attendance not found');
    res.send(successResponse(_attendance));
  } catch (error) {
    return next(
      new ApiException({
        message: 'Error in deleting Attendance',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};
