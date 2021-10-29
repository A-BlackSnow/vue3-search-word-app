import { createStore } from 'vuex';
import { Toast } from 'vant';
import router from '@/router/index';
import signUpModule from './signup/signup';
import translateModule from './translate/translate';
import wordModule from './word/word';
import vocaModule from './vocabulary/vocabulary';
import localCache from '@/utils/cache';
import sendLoginData from '@/api/login/login';
import type { IRootState, IUserInfo } from './type';

const store = createStore<IRootState>({
  state: {
    userInfo: localCache.getCache<IUserInfo>('UserInfo') || {
      avatar: '',
      _id: '',
      nickname: '',
    },
    loginData: {
      phoneNumber: '',
      passwd: '',
    },
  },
  mutations: {
    updateUserInfo(state, payload: IUserInfo) {
      state.userInfo = payload;
      localCache.setCache('UserInfo', payload);
    },
    updateLoginData(state, payload: {updateType: 'phoneNumber' | 'passwd', value: string}) {
      state.loginData[payload.updateType] = payload.value;
    },
    emptyLoginData(state) {
      state.loginData.phoneNumber = '';
      state.loginData.passwd = '';
    },
  },
  actions: {
    async loginAction(context) {
      const { state: { loginData }, commit, dispatch } = context;

      const loginRes = await sendLoginData(loginData);

      // 登录成功
      if (loginRes.code === 200 && loginRes.data.isSuccessful) {
        // 清空输入框的值
        commit('emptyLoginData');

        // 登录成功提示框
        Toast.success({
          message: '登录成功！',
          overlay: true,
          duration: 1500,
          onClose() {
            router.go(-1);
          },
        });

        // 持久化存储数据
        const { userData, vocaData } = loginRes.data;
        commit('updateUserInfo', userData);
        dispatch('vocaModule/updateAllVocas', vocaData.vocabularys);
      }

      // 登录失败
      if (loginRes.code === 200 && !loginRes.data.isSuccessful) {
        Toast.fail('手机号或密码错误！');
      }
    },
  },
  modules: {
    signUpModule,
    translateModule,
    wordModule,
    vocaModule,
  },
});

export default store;
