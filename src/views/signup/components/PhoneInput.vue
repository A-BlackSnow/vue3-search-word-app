<template>
  <div class="phone-input">
    <custom-input>
      <van-field
        type="number"
        name="phoneNumber"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="phoneInputRule"
        v-model.trim="phoneVal"
      >
        <template #left-icon>
          <van-icon class="iconfont icon-phone" />
        </template>
      </van-field>
    </custom-input>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import CustomInput from './CustomInput.vue';
import { phoneInputRule } from './config';
import type { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const phoneVal = computed({
  get() {
    return store.state.signUpModule.phoneNumber;
  },
  set(val) {
    store.commit('signUpModule/updateSignUpData', { key: 'phoneNumber', value: val });
  },
});
</script>

<style lang="scss" scoped>
</style>
