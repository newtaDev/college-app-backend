import { UserType } from '../../utils/enums';
/// Auth
const adminUsersList = [UserType.admin, UserType.superAdmin] as const;
const facultyUsersList = [UserType.staff, UserType.principal] as const;
const studentUsersList = [UserType.student] as const;
const teacherUsersList = [UserType.teacher] as const;

// convert list into string literal union type
type AdminUserTypes = typeof adminUsersList[number];
type FacultyUserTypes = typeof facultyUsersList[number];
type StudentUserTypes = typeof studentUsersList[number];
type TeacherUserTypes = typeof teacherUsersList[number];
