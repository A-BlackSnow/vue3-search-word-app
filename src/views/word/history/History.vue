<template>
  <div class="search-history">
    <div class="history-wrap" v-if="isShowHistory">
      <div class="history-header">
        <span>查询历史</span>
        <span @click="clearHistory">清除历史</span>
      </div>
      <div class="history-list" @click="goWordDetail">
        <div
          class="history-item"
          v-for="history in searchHistory"
          :key="history.word"
          :data-word="history.word"
        >
          <h3 class="word-name">{{ history.word }}</h3>
          <p class="word-means">{{ outputMeans(history.parts) }}</p>
        </div>
      </div>
    </div>
    <div class="no-history" v-else>
      <p>暂无历史记录</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { IStoreType } from '@/store/type';
import type { IPart } from '@/api/word/type';

const store = useStore<IStoreType>();
const router = useRouter();
const { searchHistory } = toRefs(store.state.wordModule);

const isShowHistory = computed(() => {
  return searchHistory.value.length;
});

const outputMeans = (parts: IPart[]) => {
  return parts.reduce((prevText, part) => {
    const meansText = prevText + part.part;
    return part.means.reduce((subPrevText, mean) => {
      return `${subPrevText + mean}; `;
    }, meansText);
  }, '');
};

const goWordDetail = (e: any) => {
  const { target } = e;
  const word = target.dataset.word || target.parentElement?.dataset.word;

  router.push({
    name: 'WordDetail',
    params: {
      wordName: word,
    },
  });
};

const clearHistory = () => {
  store.commit('wordModule/clearHistory');
};
</script>

<style lang="scss">
.search-history {
  padding: 15px;
  font-size: 13px;
  .history-header {
    display: flex;
    justify-content: space-between;
    line-height: 38px;
    span {
      padding: 0 5px;
      margin-left: -5px;
      color: $SecondaryFontColor;
      &:last-child {
        margin-right: -5px;
        color: $MainColor;
      }
    }
  }
  .history-list {
    .history-item {
      display: flex;
      line-height: 38px;
    }
    .word-means {
      margin-left: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: $SecondaryFontColor;
    }
  }
  .no-history {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 22px;
    margin: auto;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    color: hotpink;
  }
}
</style>
