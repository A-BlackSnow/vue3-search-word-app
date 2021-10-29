<template>
  <panel title="词态变化" v-if="exchangeData">
    <div class="exchange-panel">
      <div class="exchange-list">
        <p class="exchange-item" v-for="(item, key) in exchangeData" :key="key">
          <span class="exchange-name">{{ exchangeName(key as string) }}：</span>
          <span class="exchange-word">{{ item[0] }}</span>
        </p>
      </div>
    </div>
  </panel>
</template>
<script setup lang="ts">
import { defineProps, toRef } from 'vue';
import Panel from './Panel.vue';
import type { IExchangeWordData } from '../type';

const props = defineProps<{ exchangeData: IExchangeWordData }>();
const exchangeData = toRef(props, 'exchangeData');

const exchangeName = (key: string) => {
  switch (key) {
    case 'word_third':
      return '第三人称单数';
    case 'word_past':
      return '过去式';
    case 'word_done':
      return '过去分词';
    case 'word_ing':
      return '现在分词';
    case 'word_pl':
      return '复数';
    case 'word_er':
      return '比较级';
    case 'word_est':
      return '最高级';
    case 'word_adv':
      return '副词';
    case 'word_noun':
      return '名词';
    default:
      return '';
  }
};
</script>

<style lang="scss">
.exchange-panel {
  padding-top: 10px;
}
.exchange-list {
  display: flex;
  flex-wrap: wrap;
  .exchange-item {
    font-size: 14px;
    min-width: 50%;
    margin-bottom: 6px;
    .exchange-word {
      color: $MainColor;
    }
  }
}
</style>
