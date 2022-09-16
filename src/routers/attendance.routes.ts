import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import { authMiddleware } from '../middlewares/auth_middleware';
import {
  getAllAttendances,
  findAttendanceById,
  deleteAttendanceById,
  createAttendance,
  updateAttendanceById,
  getAttendancesReportOfSubjects,
  getAbsentStudentsReportInEachSubject,
  getAbsentClassesReportOfStudents,
} from '../modules/attendance/attendance.controller';
import {
  validateAbsentClassesOfStudentParamReq,
  validateAbsentClassesOfStudentQueryReq as validateAbsentClassesReportOfStudentReq,
  validateAbsentStudentsReportInEachSubject,
  validateAttendanceByIdParam,
  validateAttendancesWithAllSubjects,
  validateCreateAttendance,
} from '../modules/attendance/attendance.validator';
import I_BaseRouter from './routes';

export class AttendanceRouter implements I_BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/attendance';
  router: Router;
  private initRoutes(): void {
    this.router.get(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: validateAttendancesWithAllSubjects,
        }),
      ],
      getAllAttendances
    );
    this.router.post(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({ body: validateCreateAttendance }),
      ],
      createAttendance
    );
    this.router.get(
      `${this.path}/:attendanceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateAttendanceByIdParam }),
      ],
      findAttendanceById
    );
    this.router.put(
      `${this.path}/:attendanceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateAttendanceByIdParam }),
      ],
      updateAttendanceById
    );
    this.router.delete(
      `${this.path}/:attendanceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({ params: validateAttendanceByIdParam }),
      ],
      deleteAttendanceById
    );
    this.router.get(
      `${this.path}/report/subjects`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: validateAttendancesWithAllSubjects,
        }),
      ],
      getAttendancesReportOfSubjects
    );
    this.router.get(
      `${this.path}/report/subjects/students`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: validateAbsentStudentsReportInEachSubject,
        }),
      ],
      getAbsentStudentsReportInEachSubject
    );
    this.router.get(
      `${this.path}/report/subjects/students/:studentId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: validateAbsentClassesOfStudentParamReq,
          query: validateAbsentClassesReportOfStudentReq,
        }),
      ],
      getAbsentClassesReportOfStudents
    );
  }
}
