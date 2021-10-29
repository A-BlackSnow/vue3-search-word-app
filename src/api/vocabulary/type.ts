import type { IVocaItem, IVocaWordItem } from '@/api/login/type';

export type { IResponseData } from '@/api/request/type';

export interface IAddNewVocaResData {
  isSuccessAdd: boolean,
  vocaNames: {name: string, cTime: number}[]
}

export interface IDeleteVocaResData {
  isSuccessDelete: boolean,
}

export interface IGetAllVocasResData {
  vocabularys: IVocaItem[],
}

export interface IAddNewWordResData {
  isSuccessAdd: boolean,
  wordData: IVocaWordItem,
}
