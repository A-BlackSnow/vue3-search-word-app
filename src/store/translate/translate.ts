import type { Module } from 'vuex';
import type { ITranslateState } from './type';
import type { IRootState } from '../type';
import translate from '@/api/translate/translate';

let timer: null | number = null;
const translateModule: Module<ITranslateState, IRootState> = {
  namespaced: true,
  state: {
    fromText: '',
    toText: '',
    fromLangType: 'en',
    toLangType: 'zh',
  },
  mutations: {
    updateFromText(state, payload: {val: string}) {
      state.fromText = payload.val;
    },
    updateToText(state, payload: {val: string}) {
      if (!state.fromText && payload.val) return;
      state.toText = payload.val;
    },
    changeLangType(state) {
      [state.fromLangType, state.toLangType] = [state.toLangType, state.fromLangType];

      if (state.toText) {
        state.fromText = state.toText;
        state.toText = '';
      } else {
        state.fromText = '';
      }
    },
  },
  actions: {
    async translationReq({ state, commit }) {
      // 空值状态不触发翻译请求
      if (!state.fromText) {
        commit('updateToText', { val: '' });
        return;
      }

      // 设置翻译中的状态
      if (!state.toText) {
        commit('updateToText', { val: '翻译中...' });
      }

      // 清除定时器
      if (timer) clearTimeout(timer);

      // 设置定时器
      timer = setTimeout(async () => {
        timer = null;
        const params = {
          translateText: state.fromText,
          to: state.toLangType,
          from: state.fromLangType,
        };

        if (params.translateText) {
          const { data: { trans_result: transResult } } = await translate(params);
          const transResLength = transResult.length - 1;

          const transResText = transResult.reduce((acc, curr, index) => {
            let { dst } = curr;
            if (transResLength !== index) {
              dst += '\n';
            }
            return acc + dst;
          }, '');
          commit('updateToText', { val: transResText });
        } else {
          commit('updateToText', { val: '' });
        }
      }, 400);
    },
  },
};

export default translateModule;
