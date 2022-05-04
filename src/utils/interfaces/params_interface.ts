export interface I_ApiExceptionsParams {
  message: string;
  devMsg: string;
  statuscode: number;
}
export interface I_RouteNotFoundParams {
  message: string;
  devMsg: string;
  statuscode: number;
  routeInfo: Record<string, unknown>;
}
