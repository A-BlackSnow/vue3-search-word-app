import network from '../request';
import type { IResponseData } from '@/api/request/type';
import type { IDailySentencesResData } from './type';

export default (): Promise<IResponseData<IDailySentencesResData>> => {
  return network.get({
    url: '/daily',
  }, { isShowLoading: false });
};
