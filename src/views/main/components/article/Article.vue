<template>
  <div class="article" v-if="articleData">
    <article-panel :articleItemData="articleData?.daily" title="每日系列">
      <template v-slot:banner><my-daily></my-daily></template>
    </article-panel>
    <article-panel :articleItemData="articleData?.listening" title="听力专区"></article-panel>
    <article-panel :articleItemData="articleData?.course" title="爆款好课"></article-panel>
    <article-panel :articleItemData="articleData?.reading" title="阅读精选"></article-panel>
    <article-panel :articleItemData="articleData?.reading" title="咨询文章"></article-panel>
    <article-panel :articleItemData="articleData?.blog" title="英语博客"></article-panel>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
import getMainData from '@/api/main/main';
import type { Datum } from '@/api/main/type';
import ArticlePanel from './ArticlePanel.vue';
import MyDaily from './Daily.vue';

export default defineComponent({
  setup() {
    const articleData = ref<Datum | null>(null);
    const loadArticleData = async (isShowLoading = true) => {
      articleData.value = (await getMainData(isShowLoading)).data;
    };
    onMounted(loadArticleData);

    return { articleData, loadArticleData };
  },
  components: {
    ArticlePanel,
    MyDaily,
  },
});
</script>

<style lang="scss" scoped>
.article {
  margin-top: 38px;
}
</style>
