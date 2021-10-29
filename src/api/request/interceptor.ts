import { Toast } from 'vant';
import router from '@/router';
import localCache from '@/utils/cache';
import type { AxiosInstance, IAxiosInterceptors } from './type';
import { isIResponseData } from './type';

export class InterceptorManager {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.bindBasicInter();
  }

  public bindInterceptors(inter: IAxiosInterceptors): void {
    this.axios.interceptors.request.use(inter.request?.onFulfilled, inter.request?.onRejected);
    this.axios.interceptors.response.use(inter.response?.onFulfilled, inter.response?.onRejected);
  }

  private bindBasicInter() {
    this.bindInterceptors({
      request: {
        onFulfilled(config) {
          const token = localCache.getCache<string>('token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },

        onRejected(error) {
          Toast.fail('配置错误，请求未发出！');
          console.error(error);
        },
      },
      response: {
        onFulfilled(response) {
          // 数据不符合预期
          if (!(response.data instanceof Object) || (isIResponseData(response.data) && response.data.code !== 200)) {
            Toast.fail(response.data?.message || '服务器异常，请稍后重试！');
            return { code: response.data.code ?? 400 };
          }
          // 将服务器发过来的token持久化存储
          if (response.headers['x-access-token']) {
            localCache.setCache('token', response.headers['x-access-token']);
          }

          return response.data;
        },
        onRejected(error) {
          // token过期或不合法，需要登录
          if (error.response?.status === 401) {
            localCache.deleteCache('token');
            router.push({ name: 'Login' });
            return {};
          }

          Toast.fail('网络异常，请稍后重试！');
          return { code: 400 };
        },
      },
    });
  }
}

export const createInterceptorManager = (axios: AxiosInstance): InterceptorManager => new InterceptorManager(axios);
