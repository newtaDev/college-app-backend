import { ApiException, RouteNotFoundException } from '../../exceptions/exceptions';

type ApiResStatus = 'ERROR' | 'OK';
type ExceptionsOnErrorMiddleware = ApiException | RouteNotFoundException