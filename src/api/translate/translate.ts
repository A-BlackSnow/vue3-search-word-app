import network from '../request';
import type { ITranslateParams, ITranslateRes } from './type';
import type { IResponseData } from '@/api/request/type';

export default (translateParams: ITranslateParams): Promise<IResponseData<ITranslateRes>> => {
  return network.post({
    url: '/translate',
    data: translateParams,
  }, { isShowLoading: false });
};
