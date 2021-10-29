<template>
  <div class="voca-word-list">
    <my-header :title="props.vocaName" back-path="/vocabulary"></my-header>
    <div class="voca-detail-content" v-if="voca && voca.words.length">
      <div class="word-count">
        <van-icon class="iconfont icon-bars"></van-icon>
        <span>共{{ voca.words.length }}个单词</span>
      </div>
      <div class="word-list">
        <div class="word-item" v-for="word in voca.words" :key="word.wordName" @click="goVocaWordDetail(word.wordName)">
          <h3 class="word-name">{{ word.wordName }}</h3>
          <p class="word-symbol">
            <span v-if="word.wordData.ph_en">英 / {{ word.wordData.ph_en }} /</span>
            <span v-if="word.wordData.ph_am">美/ {{ word.wordData.ph_am }} /</span>
          </p>
          <p class="word-trans">{{ outputMeans(word.wordData.parts) }}</p>
        </div>
      </div>
    </div>
    <div class="no-word" v-else>
      <custom-empty description="您还没有添加任何单词哦"></custom-empty>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { IStoreType } from '@/store/type';
import type { IPart } from '@/api/word/type';
import MyHeader from '@/components/Header.vue';
import CustomEmpty from '@/components/Empty.vue';

const props = defineProps<{ vocaName: string }>();
const store = useStore<IStoreType>();
const router = useRouter();
const voca = computed(() => {
  return store.state.vocaModule.vocabularys.find((vocaItem) => vocaItem.name === props.vocaName);
});

const outputMeans = (parts: IPart[]) => {
  return parts.reduce((prevText, part) => {
    const meansText = prevText + part.part;
    return part.means.reduce((subPrevText, mean) => {
      return `${subPrevText + mean}; `;
    }, meansText);
  }, '');
};

const goVocaWordDetail = (wordName: string) => {
  router.push({ name: 'VocaWordDetail', params: { wordName } });
};
</script>

<style lang="scss">
.voca-detail-content {
  padding: 15px 10px;
  font-size: 12px;
  .word-count {
    color: $MainColor;
    font-size: 15px;
    line-height: 16px;
    height: 16px;
    & > * {
      vertical-align: top;
    }
    .icon-bars {
      margin-right: 5px;
    }
  }
  .word-list {
    padding: 22px 5px 10px;

    .word-item {
      &:not(:last-child) {
        margin-bottom: 22px;
      }
      .word-name {
        font-size: 18px;
        line-height: 24px;
        font-weight: 500;
      }
      .word-symbol,
      .word-trans {
        color: $SecondaryFontColor;
        line-height: 18px;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .word-symbol span:first-child {
        margin-right: 8px;
      }
    }
  }
}
.voca-word-list {
  .no-word {
    margin-top: 100px;
  }
}
</style>
