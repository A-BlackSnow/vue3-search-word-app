<template>
  <div class="login-page">
    <my-header title="登录"></my-header>
    <div class="login-content">
      <div class="form-panal">
        <van-form @submit="submitLoginData">
          <!-- 手机号输入框 -->
          <div class="custom-input">
            <van-field
              type="number"
              maxlength="11"
              placeholder="请输入手机号"
              v-model.trim="phoneVal"
              :rules="phoneInputRule"
            >
              <template #left-icon>
                <van-icon class="iconfont icon-phone" />
              </template>
            </van-field>
          </div>

          <!-- 密码输入框 -->
          <div class="custom-input">
            <van-field
              type="password"
              maxlength="16"
              placeholder="请输入登录密码"
              v-model.trim="passwdVal"
              format-trigger="onChange"
              :rules="passwdInputRule"
              :formatter="cleanSpace"
            >
              <template #left-icon>
                <van-icon class="iconfont icon-passwd" />
              </template>
            </van-field>
          </div>

          <!-- 登录按钮 -->
          <div class="action-container">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              :disabled="isDisabledSubmit"
            >登录</van-button>
            <a class="jump-btn" @click="goSignUpPage">没有账号？去注册</a>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { phoneInputRule, passwdInputRule } from './config';
import MyHeader from '@/components/Header.vue';
import type { IStoreType } from '@/store/type';

const router = useRouter();
const store = useStore<IStoreType>();
const isDisabledSubmit = ref(false);

const toStore = (ValueType: 'phoneNumber' | 'passwd') => {
  return computed({
    get() {
      return store.state.loginData[ValueType];
    },
    set(value) {
      store.commit('updateLoginData', { updateType: ValueType, value });
    },
  });
};
const phoneVal = toStore('phoneNumber');
const passwdVal = toStore('passwd');

const cleanSpace = (inputVal: string) => {
  return inputVal.replace(/\s/g, '');
};

const submitLoginData = async () => {
  isDisabledSubmit.value = true;
  await store.dispatch('loginAction');
  isDisabledSubmit.value = false;
};

const goSignUpPage = () => router.push({ name: 'SignUp' });
</script>

<style lang="scss">
// .login-page {
//   background-color: #000;
// }
.login-content {
  min-height: calc(100vh - 46px);
  display: flex;
  align-items: center;
}
.form-panal {
  width: 100%;
  padding: 0 15px;
  position: relative;
  top: -40px;
}
.custom-input {
  margin-bottom: 25px;
  .van-cell {
    padding-bottom: 22px;
    &::after {
      display: none;
    }
  }
  .van-field__value {
    margin: 0 15px 0 20px;
    &::before {
      content: "";
      position: absolute;
      bottom: -5px;
      z-index: 10;
      left: 0;
      right: 0;
      height: 1px;
      background-color: $MainColor;
    }
  }
  .van-field__error-message {
    position: absolute;
    margin-top: 2px;
  }
  .iconfont {
    font-size: 22px;
    top: 5px;
    color: $MainColor;
  }
}
.action-container {
  padding: 0 20px;

  .jump-btn {
    display: block;
    margin-top: 22px;
    text-align: center;
    text-decoration: underline;
    color: $SecondaryFontColor;
  }
}
</style>
