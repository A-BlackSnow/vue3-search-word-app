import network from '../request';
import type { IUserResData } from './type';
import type { IResponseData } from '@/api/request/type';

export default (): Promise<IResponseData<IUserResData>> => {
  return network.get({
    url: '/user',
  }, { isShowLoading: false });
};
