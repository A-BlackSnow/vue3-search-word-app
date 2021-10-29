<template>
  <panel title="场景例句" v-if="sentences">
    <div class="sentence-panel">
      <div class="sentence-list">
        <div class="sentence-item" v-for="sentence in sentences" :key="sentence.id">
          <p class="sentence-en" v-html="wordHighlight(sentence.en)"></p>
          <p class="sentence-zh">{{ sentence.cn }}</p>
          <p class="sentence-from">来源：{{ sentence.from }}</p>
        </div>
      </div>
    </div>
  </panel>
</template>
<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue';
import Panel from './Panel.vue';
import type { IExchangeWordData, ISentences } from '../type';

const props = defineProps<{ sentences: ISentences, wordName: string, exchangeData: IExchangeWordData }>();
const { sentences, wordName, exchangeData } = toRefs(props);

const regText = computed(() => {
  if (exchangeData.value && wordName.value) {
    const data = exchangeData.value;
    const keys = Object.keys(data);
    const exchangeText = keys.reduce((prev, key) => {
      const exchangeItem = data[key];
      const subExchange = exchangeItem.reduce((subPrev, item) => {
        return `${subPrev}|${item}`;
      }, '');

      return `${prev}${subExchange}`;
    }, '');

    return `\\b(${wordName.value + exchangeText})\\b`;
  }
  return `\\b(${wordName.value})\\b`;
});

const wordHighlight = (sentence: string) => {
  return sentence.replace(new RegExp(regText.value, 'gi'), '<span class="word-hightlight">$1</span>');
};
</script>

<style lang="scss">
.sentence-panel {
  font-size: 14px;
  padding: 15px 0;
}
.sentence-item {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
  .sentence-en {
    margin-bottom: 6px;
    line-height: 20px;
    .word-hightlight {
      padding: 0 2px;
      background-color: $MainColor;
      color: #fff;
    }
  }
  .sentence-zh {
    margin-bottom: 10px;
    line-height: 16px;
    color: darken($SecondaryFontColor, 20%);
  }
  .sentence-from {
    font-size: 12px;
    color: lighten($SecondaryFontColor, 10%);
  }
}
</style>
