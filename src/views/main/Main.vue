<template>
  <div class="main-page page-wrapper">
    <header class="main-header">
      <slogan></slogan>
      <search-input @click.prevent="toWordPage"></search-input>
    </header>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="loadding"
      @refresh="onRefresh"
      :pull-distance="30"
    >
      <div class="main-content">
        <floor></floor>
        <my-article ref="articleRef"></my-article>
      </div>
    </van-pull-refresh>
    <my-tabbar></my-tabbar>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MyTabbar from '@/components/Tabbar.vue';
import Slogan from './components/slogan/Slogan.vue';
import SearchInput from './components/search/Search.vue';
import Floor from './components/floor/Floor.vue';
import MyArticle from './components/article/Article.vue';

const router = useRouter();
// 下拉加载状态
const loadding = ref(false);
// 获取子组件对象
const articleRef = ref<InstanceType<typeof MyArticle>>();

// 下拉事件监听，调用子组件方法加载新数据
const onRefresh = async () => {
  await articleRef.value?.loadArticleData(false);
  loadding.value = false;
};
// 点击搜索框跳转查单词页面
const toWordPage = () => router.push({ name: 'SearchHistory' });

</script>

<style lang="scss">
.main-page {
  position: relative;
  background-color: $ContentBkColor;
  .main-header {
    position: relative;
    padding: 30px $GPadding 28px;
    color: #fff;
    background-color: $MainColor;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 450px;
      background-color: $MainColor;
    }
  }
  .main-content {
    position: relative;
    min-height: 450px;
    margin-top: 15px;
    padding: 24px $GPadding 18px;
    background-color: $ContentBkColor;
    z-index: 1;

    &::before {
      content: "";
      width: 375px * 1.8;
      position: absolute;
      left: -375px * 0.4;
      top: -15px;
      height: 150px;
      background-color: $ContentBkColor;
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
      z-index: -1;
    }
  }
  .van-pull-refresh__head,
  .van-loading__spinner,
  .van-loading__text {
    color: #fff !important;
  }
}
</style>
