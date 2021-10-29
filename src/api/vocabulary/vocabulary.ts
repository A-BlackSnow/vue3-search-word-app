import network from '../request';
import type {
  IAddNewVocaResData, IDeleteVocaResData, IResponseData, IGetAllVocasResData, IAddNewWordResData,
} from './type';

export const addNewVocaRes = (vocaName: string): Promise<IResponseData<IAddNewVocaResData>> => {
  return network.post({
    url: '/vocabulary/names',
    data: { vocaName },
  }, { loadingText: '正在创建中' });
};

export const deleteVocaRes = (vocaName: string): Promise<IResponseData<IDeleteVocaResData>> => {
  return network.delete({
    url: '/vocabulary/names',
    params: {
      vocaName,
    },
  }, { loadingText: '正在删除中' });
};

export const getAllVocaRes = (): Promise<IResponseData<IGetAllVocasResData>> => {
  return network.get({
    url: '/vocabulary/words',
  }, {
    isShowLoading: false,
  });
};

export const addNewWordRes = (vocaName: string, word: string): Promise<IResponseData<IAddNewWordResData>> => {
  return network.post({
    url: '/vocabulary/words',
    data: {
      vocaName,
      word,
    },
  }, {
    loadingText: '正在添加单词',
  });
};
