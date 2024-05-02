export interface LoginRequestData {
  /** admin 或 editor */
  username: string;
  /** 密码 */
  password: string;
}

export type LoginResponseData = ApiResponseData<{
  token: string;
  userId: number;
}>;
