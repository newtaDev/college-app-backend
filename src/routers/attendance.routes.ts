import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation_middleware';
import { authMiddleware } from '../middlewares/auth_middleware';
import { attendanceController } from '../modules/attendance/attendance.controller';
import { attendanceValidator } from '../modules/attendance/attendance.validator';
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
          query: attendanceValidator.validateAttendancesWithAllSubjects,
        }),
      ],
      attendanceController.getAll
    );
    this.router.post(
      this.path,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          body: attendanceValidator.validateCreateAttendance,
        }),
      ],
      attendanceController.create
    );
    this.router.get(
      `${this.path}/:attendanceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: attendanceValidator.validateAttendanceByIdParam,
        }),
      ],
      attendanceController.findById
    );
    this.router.put(
      `${this.path}/:attendanceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: attendanceValidator.validateAttendanceByIdParam,
        }),
      ],
      attendanceController.updateById
    );
    this.router.delete(
      `${this.path}/:attendanceId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: attendanceValidator.validateAttendanceByIdParam,
        }),
      ],
      attendanceController.deleteById
    );
    this.router.get(
      `${this.path}/report/subjects`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: attendanceValidator.validateAttendancesWithAllSubjects,
        }),
      ],
      attendanceController.getAttendancesReportOfSubjects
    );
    this.router.get(
      `${this.path}/report/subjects/students`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          query: attendanceValidator.validateAbsentStudentsReportInEachSubject,
        }),
      ],
      attendanceController.getAbsentStudentsReportInEachSubject
    );
    this.router.get(
      `${this.path}/report/subjects/students/:studentId`,
      [
        authMiddleware(),
        validateSchemaMiddleware({
          params: attendanceValidator.validateAbsentClassesOfStudentParamReq,
          query: attendanceValidator.validateAbsentClassesReportOfStudentReq,
        }),
      ],
      attendanceController.getAbsentClassesReportOfStudents
    );
  }
}
