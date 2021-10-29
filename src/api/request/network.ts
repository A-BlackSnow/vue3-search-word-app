import Axios from 'axios';
import { Toast } from 'vant';
import { InterceptorManager, createInterceptorManager } from './interceptor';
import type {
  AxiosInstance,
  AxiosRequestConfig as ReqConfig,
  IAxiosInterceptors as IAxiosInter,
  ICustomConfig,
  IResponseData,
} from './type';

class Network {
  private axios: AxiosInstance;

  private interManager: InterceptorManager;

  constructor(config: ReqConfig, interceptors?: IAxiosInter) {
    this.axios = Axios.create(config);
    this.interManager = createInterceptorManager(this.axios);

    if (interceptors) {
      this.bindInter(interceptors);
    }
  }

  public bindInter(interceptors: IAxiosInter): void {
    this.interManager.bindInterceptors(interceptors);
  }

  private async request<T>(config: ReqConfig, customConfig: ICustomConfig): Promise<IResponseData<T>> {
    let toast = null;
    if (customConfig.isShowLoading || typeof customConfig.isShowLoading === 'undefined') {
      Toast.allowMultiple();
      toast = Toast.loading(customConfig.loadingText || '正在加载中...');
    }
    const response = await this.axios.request<unknown, IResponseData<T>>(config);

    if (toast) {
      toast.clear();
    }

    return response;
  }

  public get<T>(config: ReqConfig, customConfig?: ICustomConfig): Promise<IResponseData<T>> {
    return this.request<T>({ ...config, method: 'GET' }, { ...customConfig });
  }

  public post<T>(config: ReqConfig, customConfig?: ICustomConfig): Promise<IResponseData<T>> {
    return this.request<T>({ ...config, method: 'POST' }, { ...customConfig });
  }

  public delete<T>(config: ReqConfig, customConfig?: ICustomConfig): Promise<IResponseData<T>> {
    return this.request<T>({ ...config, method: 'DELETE' }, { ...customConfig });
  }
}

export default (config: ReqConfig, interceptors?: IAxiosInter): Network => new Network(config, interceptors);
