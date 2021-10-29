<template>
  <div class="passwd-input">
    <custom-input>
      <van-field
        type="password"
        name="passwd"
        maxlength="16"
        placeholder="请输入密码"
        format-trigger="onChange"
        v-model.trim="passwdVal"
        :rules="passwdInputRule"
      >
        <template #left-icon>
          <van-icon class="iconfont icon-passwd" />
        </template>
      </van-field>
    </custom-input>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import CustomInput from './CustomInput.vue';
import { passwdInputRule } from './config';
import type { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const passwdVal = computed({
  get() {
    return store.state.signUpModule.passwd;
  },
  set(val) {
    store.commit('signUpModule/updateSignUpData', { key: 'passwd', value: val });
  },
});
</script>

<style lang="scss" scoped>
</style>
