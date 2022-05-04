import { ApiResStatus } from './@types/common';

export interface I_ResFailure {
  status: ApiResStatus;
  message: string;
  devMsg: string;
  statuscode: number;
  errorstack?: string | unknown;
}

export interface I_RouteNotFound extends I_ResFailure {
  routeInfo: Record<string, unknown>;
}
