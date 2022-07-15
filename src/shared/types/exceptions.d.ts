import {
  ApiException,
  RouteNotFoundException,
} from '../exceptions/api_exceptions';

type ApiResStatus = 'ERROR' | 'OK';
type ExceptionsOnErrorMiddleware = ApiException | RouteNotFoundException;
type ErrorStack = { info: string | unknown; path: string | unknown };

interface I_ApiErrorRes {
  status: ApiResStatus;
  message: string;
  devMsg: string;
  statuscode: number;
  errorDetails?: unknown;
  errorStack?: ErrorStack | unknown;
}

interface I_RouteNotFound extends I_ApiErrorRes {
  routeInfo: Record<string, unknown>;
}
