<template>
  <div class="article-panel">
    <h2 class="panel-title">{{ attrs.title }}</h2>
    <slot name="banner"></slot>
    <ul class="article-list">
      <li class="article-summary"
        v-for="article in props.articleItemData"
        :key="article.id"
        @click="toArticlePage"
      >
        <div class="article-info">
          <h3>{{ article.title }}</h3>
          <p>{{ article.provenance }}</p>
        </div>
        <div class="articel-cover">
          <!-- <img class="cover-img" v-lazy="article.cover" /> -->
          <van-image class="cover-img" lazy-load :src="article.cover"></van-image>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useAttrs, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import type { IBasicItem } from '@/api/main/type';

const router = useRouter();
const attrs = useAttrs();
const props = defineProps<{ articleItemData: IBasicItem[] }>();
const toArticlePage = () => {
  router.push({ name: 'Other', params: { name: 'article', title: '文章详细' } });
};
</script>

<style lang="scss" scoped>
.article-panel {
  position: relative;
  background-color: #fff;
  border-radius: 12px;
  padding: 0 15px;
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0;
  }
}
.panel-title {
  font-size: 24px;
  line-height: 62px;
}
.article-list {
  overflow: hidden;
  .article-summary {
    display: flex;
    align-items: center;
    height: 58px;
    margin-bottom: 33px;

    .article-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 210px;
      height: 100%;
      line-height: 1;
      padding-right: 7px;
      h3 {
        font-size: 15px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      p {
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: $SecondaryFontColor;
      }
    }
    .articel-cover {
      width: 102px;
      height: 100%;
      overflow: hidden;
      border-radius: 7px;
      .cover-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
