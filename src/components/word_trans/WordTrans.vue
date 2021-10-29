<template>
  <div class="word-detail" v-if="wordData.basicData.word_name">
    <basic-panel :basicData="wordData.basicData"></basic-panel>
    <paraphrase-panel :means="wordData.paraphraseData"></paraphrase-panel>
    <exchange-panel :exchangeData="wordData.exchangeData"></exchange-panel>
    <sentence-panel
      :sentences="wordData.sentences"
      :wordName="wordData.basicData.word_name"
      :exchangeData="wordData.exchangeData"
    ></sentence-panel>
  </div>
</template>
<script setup lang="ts">
import {
  reactive, onMounted, onActivated,
} from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Toast } from 'vant';
import getWordData from '@/api/word/word';
import { changeWordData, commitHistory } from './hooks';
import type { IEditedWordData } from './type';
import BasicPanel from './components/BasicPanel.vue';
import ParaphrasePanel from './components/ParaphrasePanel.vue';
import ExchangePanel from './components/ExchangePanel.vue';
import SentencePanel from './components/SentencePanel.vue';

const route = useRoute();
const wordData = reactive<IEditedWordData>({
  basicData: { word_name: '' },
  paraphraseData: [],
  exchangeData: undefined,
  sentences: null,
});

const sendSearchReq = async (wordName: string) => {
  if (typeof wordName === 'string' && wordName) {
    const { code, data } = await getWordData(wordName);
    if (code === 200 && data.word) {
      const changedData = changeWordData(data);
      wordData.basicData = changedData.basicData;
      wordData.paraphraseData = changedData.paraphraseData;
      wordData.sentences = changedData.sentences;
      wordData.exchangeData = changedData.exchangeData;
      if (route.name === 'WordDetail') {
        commitHistory({ word: wordName, parts: wordData.paraphraseData });
      }
    } else if (code === 200 && !data.word) {
      Toast.fail({ message: '未找到该单词!' });
    }
  }
};

let isAllowSendReq = true;
const update = async (wordName: string) => {
  if (isAllowSendReq) {
    isAllowSendReq = false;
    await sendSearchReq(wordName);
    isAllowSendReq = true;
  }
};

onBeforeRouteUpdate((to) => {
  update(to.params.wordName as string);
});

onMounted(() => {
  update(route.params.wordName as string);
});

onActivated(() => {
  update(route.params.wordName as string);
});

</script>

<style lang="scss">
.word-detail {
  padding: 15px;
}
</style>
