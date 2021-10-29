import type { Module } from 'vuex';
import { Toast } from 'vant';
import sortFn from './sort';
import localCache from '@/utils/cache';
import {
  addNewVocaRes,
  getAllVocaRes,
  deleteVocaRes,
  addNewWordRes,
} from '@/api/vocabulary/vocabulary';
import type {
  IVocaState,
  IVocaItemData,
  IVocaListItem,
  ISortType,
} from './type';
import type { IRootState } from '../type';
import type { IVocaItem, IVocaWordItem } from '@/api/login/type';

const vocaModule: Module<IVocaState, IRootState> = {
  namespaced: true,
  state: {
    vocabularys: localCache.getCache('VocasData') || [],
    vocaList: localCache.getCache('VocaListData') || [],
    sortType: localCache.getCache('SortType') || 'timeDe',
  },
  mutations: {
    updateVoca(state, payload: {vocas: IVocaItem[], vocaList: IVocaListItem[]}) {
      const { vocas, vocaList } = payload;
      state.vocabularys = vocas;
      state.vocaList = sortFn(vocaList, state.sortType);
      localCache.setCache('VocasData', vocas);
      localCache.setCache('VocaListData', vocaList);
    },
    addNewVoca(state, payload: IVocaItemData) {
      state.vocaList.unshift(payload.vocaListItem);
      state.vocaList = sortFn(state.vocaList, state.sortType);
      state.vocabularys.unshift(payload.vocasItem);
      localCache.setCache('VocaListData', state.vocaList);
      localCache.setCache('VocasData', state.vocabularys);
    },
    deleteVoca(state, payload: {vocasIndex: number, vocaListIndex: number}) {
      state.vocabularys.splice(payload.vocasIndex, 1);
      state.vocaList.splice(payload.vocaListIndex, 1);
      localCache.setCache('VocasData', state.vocabularys);
      localCache.setCache('VocaListData', state.vocaList);
    },
    changeSortType(state, payload: {sortType: ISortType}) {
      state.sortType = payload.sortType;
      localCache.setCache('SortType', state.sortType);
      state.vocaList = sortFn(state.vocaList, state.sortType);
      localCache.setCache('VocaListData', state.vocaList);
    },
    addNewWord(state, payload: {newWordData: IVocaWordItem, vocaName: string}) {
      const targetVocaItem = state.vocabularys.find((vocaItem) => vocaItem.name === payload.vocaName);
      const targetVocaListItem = state.vocaList.find((vocaListItem) => vocaListItem.name === payload.vocaName);
      if (targetVocaItem) {
        targetVocaItem.words.push(payload.newWordData);
        localCache.setCache('VocasData', state.vocabularys);
      }
      if (targetVocaListItem) {
        targetVocaListItem.count += 1;
        localCache.setCache('VocaListData', state.vocaList);
      }
    },
  },
  actions: {
    updateAllVocas({ commit }, payload: IVocaItem[]) {
      const vocaListData: IVocaListItem[] = payload.map((vocaItem) => {
        return {
          name: vocaItem.name,
          cTime: vocaItem.cTime,
          count: vocaItem.words.length,
        };
      });
      commit('updateVoca', { vocas: payload, vocaList: vocaListData });
    },

    async getAllVocasAction({ dispatch }) {
      const getRes = await getAllVocaRes();
      if (getRes.code === 200) {
        dispatch('updateAllVocas', getRes.data.vocabularys);
      }
    },

    async deleteVocaAction({ state, commit }, payload: {deleteVocaName: string}) {
      const deleteName = payload.deleteVocaName;
      const deleteRes = await deleteVocaRes(deleteName);
      if (deleteRes.code === 200 && deleteRes.data.isSuccessDelete) {
        const indexInVocas = state.vocabularys.findIndex((vocasItem) => vocasItem.name === deleteName);
        const indexInVocaList = state.vocaList.findIndex((vocaListItem) => vocaListItem.name === deleteName);

        commit('deleteVoca', { vocasIndex: indexInVocas, vocaListIndex: indexInVocaList });
      }
    },

    async addNewVocaAction({ state, commit }, payload) {
      const addRes = await addNewVocaRes(payload.newVocaName);

      if (addRes.code === 200 && addRes.data.isSuccessAdd) {
        const { vocaNames } = addRes.data;
        const newVocaItem = vocaNames.find((vocaItem) => {
          return !state.vocaList.find((sVocaItem) => sVocaItem.name === vocaItem.name);
        });

        if (newVocaItem) {
          const newData: IVocaItemData = {
            vocaListItem: {
              name: newVocaItem.name,
              cTime: newVocaItem.cTime,
              count: 0,
            },
            vocasItem: {
              name: newVocaItem.name,
              cTime: newVocaItem.cTime,
              words: [],
            },
          };

          commit('addNewVoca', newData);
          return true;
        }
      }

      return false;
    },

    async addNewWordAction({ commit }, payload: {vocaName: string, word: string}) {
      const addRes = await addNewWordRes(payload.vocaName, payload.word);

      if (addRes.code === 200 && addRes.data.isSuccessAdd) {
        const addWordData = addRes.data.wordData;
        commit('addNewWord', { newWordData: addWordData, vocaName: payload.vocaName });
        Toast.success({ message: '添加成功!' });
      }

      if (addRes.code === 200 && !addRes.data.isSuccessAdd) {
        Toast.fail({ message: '添加失败' });
      }
    },
  },
};

export default vocaModule;
