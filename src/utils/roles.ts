import { UserType } from './enums';
/// Auth
export const adminUsersList = [UserType.admin, UserType.superAdmin] as const;
export const facultyUsersList = [UserType.staff] as const;
export const studentUsersList = [UserType.student] as const;
export const teacherUsersList = [UserType.teacher] as const;

// convert list into string literal union type
export type AdminUserTypes = typeof adminUsersList[number];
export type FacultyUserTypes = typeof facultyUsersList[number];
export type StudentUserTypes = typeof studentUsersList[number];
export type TeacherUserTypes = typeof teacherUsersList[number];
