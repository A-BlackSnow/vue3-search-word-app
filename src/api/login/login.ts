import network from '../request';
import type { LoginResponse } from './type';
import type { IResponseData } from '@/api/request/type';

export default (loginData: {phoneNumber: string, passwd: string}): Promise<IResponseData<LoginResponse>> => {
  return network.post<LoginResponse>({
    url: '/user/login',
    data: loginData,
  }, { loadingText: '正在登录中...' });
};
