import { AuthRouter } from './auth.routes';
import { ProfileRouter } from './profile.routes';
import { StudentRouter } from './student.routes';
import { TeacherRouter } from './teacher.routes';

export const userRoutes = [
  new AuthRouter(),
  new ProfileRouter(),
  new StudentRouter(),
  new TeacherRouter(),
];
