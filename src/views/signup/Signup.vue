<template>
  <div class="signup-page">
    <my-header title="注册"></my-header>
    <div class="signup-content">
      <div class="form-panal">
        <van-form @submit="sumbitSignUpData" ref="formRef">
          <nickname-input></nickname-input>
          <passwd-input></passwd-input>
          <phone-input ref="phoneInputRef"></phone-input>
          <verifycode-input @get-code="sendGetCodeRequest" ref="codeInputRef"></verifycode-input>
          <!-- 登录按钮 -->
          <div class="action-container">
            <van-button round block :disabled="isForbiddenSingnUp" type="primary" native-type="submit">注册</van-button>
            <a class="jump-btn" @click="goLoginPage">已有账号？去登录</a>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import type { FormInstance } from 'vant';
import type { IStoreType } from '@/store/type';
import { getVerifyCode, submitSignUpData } from '@/api/signup/signup';
import type { ISignUpData } from '@/api/signup/type';
import MyHeader from '@/components/Header.vue';
import PasswdInput from './components/PasswdInput.vue';
import NicknameInput from './components/NicknameInput.vue';
import PhoneInput from './components/PhoneInput.vue';
import VerifycodeInput from './components/VerifycodeInput.vue';

const router = useRouter();
const store = useStore<IStoreType>();

const isForbiddenSingnUp = ref(false);

const formRef = ref<FormInstance>();
const codeInputRef = ref<InstanceType<typeof VerifycodeInput>>();
const phoneInputRef = ref<InstanceType<typeof PhoneInput>>();

// 跳转至登录页面
const goLoginPage = () => router.replace({ name: 'Login' });

// 发送验证码请求
const sendGetCodeRequest = async () => {
  if (formRef.value) {
    // 检查手机号输入框输入值是否合法
    formRef.value.validate('phoneNumber')
        .then(async () => {
          if (codeInputRef.value && phoneInputRef.value) {
            codeInputRef.value.disableGetCode();
            const res = await getVerifyCode(store.state.signUpModule.phoneNumber);

            if (res.code === 200 && res.data.isSentSMS) {
              Toast.success('验证码已发送!');
            }
          }
        })
        .catch((err) => console.log(err));
  }
};

// 提交注册数据
const sumbitSignUpData = async (formData: ISignUpData) => {
  isForbiddenSingnUp.value = true;
  const res = await submitSignUpData(formData);
  if (res.code === 200 && res.data?.isSignUp) {
    store.commit('signUpModule/cleanAllValue');
    Toast.success('注册成功!');
    setTimeout(() => goLoginPage(), 1000);
  } else {
    isForbiddenSingnUp.value = false;
  }
};
</script>
<style lang="scss">
.signup-content {
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
