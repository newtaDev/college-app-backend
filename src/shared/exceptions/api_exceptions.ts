import { ApiResStatus, ErrorStack } from '../@types/exceptions';
import {
  I_ApiExceptionsParams,
  I_RouteNotFoundParams,
} from '../interfaces/params_interface';

// Base Exception classs for displaying errors in api's
export class ApiException extends Error {
  public status: ApiResStatus;
  public msg: string;
  public devMsg: string;
  public statuscode: number;
  public errorStack?: ErrorStack;

  constructor(params: I_ApiExceptionsParams) {
    super(params.message);
    this.status = 'ERROR';
    this.msg = params.message;
    this.devMsg = params.devMsg ?? this.message;
    this.statuscode = params.statuscode ?? 500;
    this.errorStack = ApiException.errorStackTrace(this);
  }

  // retuens a minimalistic error stack trace
  static errorStackTrace(_stack: Error): ErrorStack {
    const _errorStack = _stack.stack?.split('(');
    return {
      info: _errorStack?.at(0),
      path: _errorStack?.at(1)?.split('src').at(-1)?.split(')').at(0),
    };
  }
}

// When user goes to unknown route this error is shown
export class RouteNotFoundException extends ApiException {
  public routeInfo: Record<string, unknown>;

  constructor(params: I_RouteNotFoundParams) {
    super(params);
    this.routeInfo = params.routeInfo;
  }
}
