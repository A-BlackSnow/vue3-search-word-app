import type { Module } from 'vuex';
import localCache from '@/utils/cache';
import type { IRootState } from '../type';
import type { IWordState, IWordTransData } from './type';

const wordModule: Module<IWordState, IRootState> = {
  namespaced: true,
  state: {
    searchHistory: localCache.getCache('searchHistory') ?? [],
  },
  mutations: {
    addHistory({ searchHistory }, payload: IWordTransData) {
      const index = searchHistory.findIndex((history) => history.word === payload.word);
      if (index !== -1) {
        searchHistory.splice(index, 1);
      }

      if (searchHistory.length >= 20) {
        searchHistory.pop();
      }

      searchHistory.unshift(payload);
      localCache.setCache('searchHistory', searchHistory);
    },

    clearHistory(state) {
      state.searchHistory = [];
      localCache.deleteCache('searchHistory');
    },
  },
};

export default wordModule;
