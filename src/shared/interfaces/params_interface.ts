export interface I_ApiExceptionsParams {
  message: string;
  devMsg?: string;
  statuscode?: number;
}
export interface I_RouteNotFoundParams extends I_ApiExceptionsParams {
  routeInfo: Record<string, unknown>;
}
