<template>
  <div class="lang-switcher">
    <div class="switcher-wrap">
      <a class="lang-btn">{{ fromLang }}</a>
      <a class="switch-btn" @click="switchLang">
        <van-icon name="exchange" />
      </a>
      <a class="lang-btn">{{ toLang }}</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import type { Ref } from 'vue';
import type { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const {
  fromLangType,
  toLangType,
  fromText,
  toText,
} = toRefs(store.state.translateModule);

const langIndicator = (langType: Ref<string>) => {
  return computed(() => (langType.value === 'zh' ? '中文' : '英语'));
};

const fromLang = langIndicator(fromLangType);
const toLang = langIndicator(toLangType);

const switchLang = () => {
  store.commit('translateModule/changeLangType');
  if (fromText.value && !toText.value) {
    store.dispatch('translateModule/translationReq');
  }
};

</script>

<style lang="scss">
.switcher-wrap {
  display: flex;
  height: 48px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-width: 1px 0 1px 0;

  a {
    line-height: 48px;
  }
}
.lang-btn {
  flex: 1;
  text-align: center;
  color: $MainColor;
}
.switch-btn {
  padding: 0 16px;
  font-size: 22px;
}
</style>
