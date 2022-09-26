import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { ApiException } from '../../shared/exceptions/api_exceptions';
import { successResponse } from '../../shared/interfaces/req_res_interfaces';
import { I_JwtUserPayload } from '../../shared/services/jwt/jwt_interfaces';
import classService from '../class/class.service';
import studentService from '../user/student/student.service';
import attendanceService from './attendance.service';

export const create = async (
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

export const updateById = async (
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

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!_.isEmpty(req.query)) {
      const _attendanceQuery = await _getAllAttendancesWithQueries(
        req.query,
        req.user
      );
      return res.send(successResponse(_attendanceQuery));
    }
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

const _getAllAttendancesWithQueries = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>,
  user: I_JwtUserPayload
) => {
  try {
    const collegeId = (query.collegeId ?? user.collegeId)?.toString() as string;
    const classId = query.classId?.toString() as string;
    const currentSem = Number(query.currentSem);
    const totalStudentsInClass = await studentService.getCountOfStudents(
      collegeId,
      classId
    );
    const classSubjectsReport =
      await attendanceService.getAttendanceWithCountOfAbsentAndPresntStudents(
        collegeId,
        classId,
        currentSem,
        totalStudentsInClass
      );
    return classSubjectsReport;
  } catch (error) {
    throw new ApiException({
      message: 'Attendance Query failed',
      devMsg: error instanceof Error ? error.message : null,
      statuscode: 400,
    });
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
    const totalStudentsInClass = await studentService.getCountOfStudents(
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

export const getAbsentClassesReportOfStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collegeId = (
      req.query.collegeId ?? req.user.collegeId
    )?.toString() as string;
    const classId = req.query.classId?.toString() as string;
    const studentId = req.params.studentId?.toString() as string;
    const currentSem = Number(req.query.currentSem);
    const userClass = await classService.findById(
      classId,
      req.user.collegeId as string
    );
    const subjectsInClass =
      await attendanceService.getTotalAttendanceTakenInEachSubjectsOfClass({
        classId,
        collegeId,
        currentSem,
      });
    const absentClasses =
      await attendanceService.getAbsentClassesCountOfStudent({
        classId,
        collegeId,
        currentSem,
        studentId,
      });
    type ReportOfClass = {
      absent_class_count: number;
      total_attendance_taken: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subject: any;
    };
    const reportOfClass: ReportOfClass[] = [];
    absentClasses.forEach(subject => {
      subjectsInClass.forEach(allSubject => {
        if (allSubject.subject._id.toString() === subject._id.toString()) {
          reportOfClass.push({
            absent_class_count: subject.absent_class_count,
            total_attendance_taken: allSubject.total_attendance_taken,
            subject: subject.subject,
          });
        }
      });
    });

    subjectsInClass.forEach(allSubject => {
      if (
        !reportOfClass.some(
          ele => ele.subject._id.toString() == allSubject.subject._id.toString()
        )
      ) {
        {
          reportOfClass.push({
            absent_class_count: 0,
            total_attendance_taken: allSubject.total_attendance_taken,
            subject: allSubject.subject,
          });
        }
      }
    });
    return res.send(
      successResponse({
        class: userClass,
        report: reportOfClass,
      })
    );
  } catch (error) {
    return next(
      new ApiException({
        message: 'Absent class report of Student failed',
        devMsg: error instanceof Error ? error.message : null,
        statuscode: 400,
      })
    );
  }
};

export const findById = async (
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

export const deleteById = async (
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

export * as attendanceController from './attendance.controller';
