import type { Module } from 'vuex';
import type { ISignUpState, ICommitUpdateData } from './type';
import type { IRootState } from '../type';

// Module需要传入两个泛型，第一个泛型为当前模块的数据类型，第二个模块为根模块的数据类型。
const signUpModule: Module<ISignUpState, IRootState> = {
  namespaced: true,
  state: {
    nickname: '',
    passwd: '',
    phoneNumber: '',
    verifyCode: '',
  },
  mutations: {
    cleanAllValue(state) {
      // eslint-disable-next-line
      for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
          state[key as keyof typeof state] = '';
        }
      }
    },
    updateSignUpData(state, payload: ICommitUpdateData) {
      state[payload.key] = payload.value;
    },
  },
};

export default signUpModule;
