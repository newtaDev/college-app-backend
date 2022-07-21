import { ApiResStatus } from '../types/exceptions';

export interface I_ResSuccess {
  status: ApiResStatus;
  responseData?: unknown;
}
// export function successResponse(...args: object[]): I_ResSuccess {
//   return {
//     status: 'OK',
//     ...(args.length <= 1 && { responseData: args.at(0) }),
//     ...(args.length > 1 && { ...args.at(0) }),
//     ...(args.length > 1 && { responseData: args.at(1) }),
//   };
// }

export function successResponse(
  res: object,
  beforeRes?: object
): I_ResSuccess {
  return {
    status: 'OK',
    ...beforeRes,
    responseData: res,
  };
}
