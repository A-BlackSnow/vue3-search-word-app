import network from '../request';
import { IFindWordResData } from './type';
import type { IResponseData } from '@/api/request/type';

export default (wordName: string): Promise<IResponseData<IFindWordResData>> => {
  return network.get({
    url: '/word',
    params: {
      w: wordName,
    },
  });
};
