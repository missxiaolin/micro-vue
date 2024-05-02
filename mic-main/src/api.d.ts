/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  success: boolean;
  model: T;
  errorMessage: string;
}
