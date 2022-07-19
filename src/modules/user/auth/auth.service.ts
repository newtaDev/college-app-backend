import { userDb } from '../../../config/database/user.db';
import { I_Teacher } from '../teacher.model';

export const registerAsTeacher = (teacher: I_Teacher) =>
  userDb.Admin.create(teacher);

export const loginTeacher = (email: string) =>
  userDb.Teacher.findOne({ email: email });
