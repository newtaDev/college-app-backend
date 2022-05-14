import { ApiResStatus } from '../@types/exceptions';

export interface I_ResSuccess {
  status: ApiResStatus;
  data: unknown;
}
