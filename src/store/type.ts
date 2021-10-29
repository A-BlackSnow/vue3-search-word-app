import type { ISignUpState } from './signup/type';
import type { ITranslateState } from './translate/type';
import type { IWordState } from './word/type';
import type { IVocaState } from './vocabulary/type';

export interface IUserInfo {
  avatar: string,
  _id: string,
  nickname: string,
}

export interface IRootState {
  userInfo: IUserInfo,
  loginData: {
    phoneNumber: string,
    passwd: string,
  }
}

export interface ISubState {
  signUpModule: ISignUpState,
  translateModule: ITranslateState,
  wordModule: IWordState,
  vocaModule: IVocaState,
}

export type IStoreType = IRootState & ISubState;
