import { ApiResStatus } from '../@types/exceptions';

export interface I_ResSuccess {
  status: ApiResStatus;
  responseData: unknown;
}
export const successResponse = (data: unknown): I_ResSuccess => ({
  status: 'OK',
  responseData: data,
});
