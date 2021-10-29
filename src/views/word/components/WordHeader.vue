<template>
  <my-header class="word-header" :border="false" :back-path="backPath">
    <van-search
      clearable
      autofocus
      show-action
      left-icon
      placeholder="请输入需要搜索的单词"
      v-model="inputWord"
      @search="searchWord"
      @update:model-value="inputValChange"
    >
      <template #action>
        <a class="search-btn" :class="{ active: isAllowSearch }" @click="searchWord">搜索</a>
      </template>
    </van-search>
  </my-header>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MyHeader from '@/components/Header.vue';

const router = useRouter();
const route = useRoute();
const backPath = ref('/main');
const inputWord = ref('');
const isChanged = ref(false);
const isAllowSearch = computed(() => !!inputWord.value && isChanged.value);

const inputValChange = () => {
  isChanged.value = true;
};

// 通过跳转路由方式，由目标路由的组件发送请求
const searchWord = () => {
  if (!isAllowSearch.value) return;
  isChanged.value = false;

  router.push({
    name: 'WordDetail',
    params: {
      wordName: inputWord.value,
    },
  });
};

// 配置后退路径、搜索框的值与url同步
const pathHandler = (wordName: string | string[]) => {
  if (Array.isArray(wordName)) return;
  if (wordName !== inputWord.value) {
    inputWord.value = wordName as string;
  }
  backPath.value = wordName ? '/word' : '/main';
};

onMounted(() => {
  pathHandler(route.params.wordName);
});

router.afterEach((to) => {
  pathHandler(to.params.wordName);
});
</script>

<style lang="scss">
.word-header {
  .van-nav-bar {
    line-height: 62px;
  }
  .van-nav-bar__content {
    height: 62px;
  }
  .van-nav-bar__title {
    max-width: 335px;
    width: 335px;
    margin-left: 30px;
  }
  .van-field__control {
    height: 32px;
  }
}
a.search-btn {
  color: #a9a9a9;
  &.active {
    color: $MainColor;
  }
}
</style>
