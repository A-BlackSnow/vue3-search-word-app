<template>
  <div class="nickname-input">
    <custom-input>
      <van-field
       maxlength="8"
       name="nickname"
       placeholder="请输入昵称"
       format-trigger="onChange"
       v-model.trim="nicknameVal"
       :rules="nicknameInputRule"
      >
        <template #left-icon>
          <van-icon class="iconfont icon-user" />
        </template>
      </van-field>
    </custom-input>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { nicknameInputRule } from './config';
import CustomInput from './CustomInput.vue';
import type { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const nicknameVal = computed({
  get() {
    return store.state.signUpModule.nickname;
  },
  set(val) {
    store.commit('signUpModule/updateSignUpData', { key: 'nickname', value: val });
  },
});
</script>
<style lang="scss" scoped>
</style>;
