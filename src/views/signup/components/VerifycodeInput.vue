<template>
  <div class="verifycode-input">
    <custom-input>
      <van-field
        type="number"
        name="verifyCode"
        maxlength="6"
        placeholder="请输入验证码"
        :rules="verifyCodeInputRule"
        v-model.trim="verifyCode"
      >
        <template #left-icon>
          <van-icon class="iconfont icon-verifycode" />
        </template>
        <template #extra>
          <div class="verify-code">
            <a v-if="isAllowGet" class="get-btn" @click="getVerifyCode">获取验证码</a>
            <p v-else class="disable-get">{{ timing }}秒后再次获取</p>
          </div>
        </template>
      </van-field>
    </custom-input>
  </div>
</template>
<script lang="ts">
import {
  ref, nextTick, defineComponent, computed,
} from 'vue';
import { useStore } from 'vuex';
import type { IStoreType } from '@/store/type';
import { verifyCodeInputRule } from './config';
import CustomInput from './CustomInput.vue';

export default defineComponent({
  emits: ['getCode'],
  setup(props, ctx) {
    const store = useStore<IStoreType>();
    const isAllowGet = ref(true);
    const timing = ref<number>(60);

    const verifyCode = computed({
      get() {
        return store.state.signUpModule.verifyCode;
      },
      set(val) {
        store.commit('signUpModule/updateSignUpData', { key: 'verifyCode', value: val });
      },
    });

    // 发出获取短信验证码的通知
    const getVerifyCode = () => {
      ctx.emit('getCode');
    };

    // 获取短信验证码60秒间隔
    const disableGetCode = () => {
      isAllowGet.value = false;
      const timer = setInterval(() => {
        timing.value -= 1;
        if (timing.value === 0) {
          clearInterval(timer);
          isAllowGet.value = true;
          nextTick(() => {
            timing.value = 60;
          });
        }
      }, 1000);
    };

    return {
      isAllowGet,
      timing,
      verifyCode,
      getVerifyCode,
      disableGetCode,
      verifyCodeInputRule,
    };
  },
  components: {
    CustomInput,
  },
});
</script>
<style lang="scss" scoped>
.verify-code {
  position: absolute;
  right: 40px;
  .get-btn {
    color: $MainColor;
  }
  .disable-get {
    color: #b9b9b9;
  }
}
</style>
