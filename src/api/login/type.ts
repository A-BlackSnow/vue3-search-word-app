import { wSymbol } from '../word/type';

export interface IVocaWordItem {
  wordName: string,
  addTime: number,
  wordData: wSymbol
}

export interface IVocaItem {
  name: string,
  cTime: number,
  words: IVocaWordItem[],
}

export interface LoginResponse {
  isSuccessful: boolean,
  token: string,
  userData: {
    avatar: string,
    _id: string,
    nickname: string,
  },
  vocaData: {
    vocabularys: IVocaItem[]
  }
}
