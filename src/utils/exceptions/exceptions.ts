import { ApiResStatus } from '../interfaces/@types/common';
import {
  I_ApiExceptionsParams,
  I_RouteNotFoundParams,
} from '../interfaces/params_interface';

export class ApiException extends Error {
  public status: ApiResStatus;
  public message: string;
  public devMsg: string;
  public statuscode: number;

  constructor(params: I_ApiExceptionsParams) {
    super(params.message);
    this.status = 'ERROR';
    this.message = params.message;
    this.devMsg = params.devMsg;
    this.statuscode = params.statuscode;
  }
}

export class RouteNotFoundException extends ApiException {
  public routeInfo: Record<string, unknown>;

  constructor(params: I_RouteNotFoundParams) {
    super(params);
    this.routeInfo = params.routeInfo;
  }
}
