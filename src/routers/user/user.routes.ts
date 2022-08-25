import { AuthRouter } from './auth.routes';
import { ProfileRouter } from './profile.routes';
import { StudentRouter } from './student.routes';

export const userRoutes = [
  new AuthRouter(),
  new ProfileRouter(),
  new StudentRouter(),
];
