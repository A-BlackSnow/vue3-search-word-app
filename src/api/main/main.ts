import network from '../request';
import type { Datum } from './type';
import type { IResponseData } from '@/api/request/type';

export default (isShowLoading: boolean): Promise<IResponseData<Datum>> => {
  return network.get({ url: '/mock/main/daily' }, { isShowLoading });
};
