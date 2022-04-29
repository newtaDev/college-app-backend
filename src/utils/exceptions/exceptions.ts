import { ApiResStatus } from '../interfaces/@types/common';

export class ApiException extends Error {
  public status: ApiResStatus;
  public message: string;
  public devMsg: string;
  public statuscode: number;

  constructor({
    message,
    devMsg,
    statuscode,
  }: {
    message: string;
    devMsg: string;
    statuscode: number;
  }) {
    super(message);
    this.status = 'ERROR';
    this.message = message;
    this.devMsg = devMsg;
    this.statuscode = statuscode;
  }
}

export class RouteNotFoundException extends ApiException {
  public routeInfo: Record<string, unknown>;

  constructor({
    message,
    devMsg,
    statuscode,
    routeInfo,
  }: {
    message: string;
    devMsg: string;
    statuscode: number;
    routeInfo: Record<string, unknown>;
  }) {
    super({ message, devMsg, statuscode });
    this.routeInfo = routeInfo;
  }
}
