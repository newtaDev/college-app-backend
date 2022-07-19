import { AuthRouter } from './auth.routes';
import { ProfileRouter } from './profile.routes';

export const userRoutes = [new AuthRouter(), new ProfileRouter()];
