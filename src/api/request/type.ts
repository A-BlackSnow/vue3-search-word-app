import type {
  AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError, Method,
} from 'axios';

interface IResponseData<T = any> {
  code: number;
  data: T;
  message?: string;
}

interface InterceptorManager<T = any, V = T> {
  onFulfilled?: (value: T) => V | Promise<V>;
  onRejected?: (error: AxiosError) => any;
}

interface IAxiosInterceptors {
  request?: InterceptorManager<AxiosRequestConfig>;
  response?: InterceptorManager<AxiosResponse<IResponseData>, IResponseData | unknown>;
}

interface ICustomConfig {
  isShowLoading?: boolean,
  loadingText?: string
}

function isIResponseData(val: unknown): val is IResponseData {
  return typeof val === 'object' && val !== null && 'code' in val;
}

export {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  IAxiosInterceptors,
  IResponseData,
  Method,
  ICustomConfig,
  isIResponseData,
};
