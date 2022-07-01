export interface I_ApiExceptionsParams {
  message: string;
  devMsg?: string | null;
  statuscode?: number;
  errorDetails?: unknown;
}
export interface I_RouteNotFoundParams extends I_ApiExceptionsParams {
  routeInfo: Record<string, unknown>;
}
