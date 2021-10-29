<template>
  <panel>
    <div class="basic-panel">
      <div class="basic-header">
        <p class="word-name">{{ basicData.word_name }}</p>
        <button class="add-glossary" @click="showAddPanel">
          <span class="push-icon">
            <van-icon :name="curWordInItem ? 'success' : 'plus'" />
          </span>
          <span>{{ curWordInItem ? '已添加' : '生词本' }}</span>
        </button>
        <van-popup closeable position="bottom" v-model:show="isShowPop">
          <voca-radio @addWordClick="addNewWord"></voca-radio>
        </van-popup>
      </div>
      <div class="word-tag">{{ wordTagText }}</div>
      <div class="phonetic-symbol">
        <div class="en-symbol" v-if="basicData.ph_en">英 / {{ basicData.ph_en }} /</div>
        <div class="am-symbol" v-if="basicData.ph_am">美 / {{ basicData.ph_am }} /</div>
        <div class="other-symbol" v-if="isShowOther">/{{ basicData.ph_other }}</div>
      </div>
      <div class="word-frequence" v-if="basicData.frequence">
        <van-icon v-for="index in basicData.frequence" :key="index" name="star" class="light-star" />
        <van-icon
          v-for="index in (5 - basicData.frequence)"
          :key="index"
          name="star"
          class="dark-star"
        />
      </div>
    </div>
  </panel>
</template>
<script setup lang="ts">
import {
  defineProps,
  toRef,
  computed,
  ref,
} from 'vue';
import { useStore } from 'vuex';
import { IStoreType } from '@/store/type';
import type { IBasicWordData } from '../type';
import Panel from './Panel.vue';
import VocaRadio from './VocaRadio.vue';

const store = useStore<IStoreType>();
const props = defineProps<{ basicData: IBasicWordData }>();
const basicData = toRef(props, 'basicData');
const vocas = toRef(store.state.vocaModule, 'vocabularys');
const isShowPop = ref(false);

// 当前单词所在的单词本
const curWordInItem = computed(() => {
  return vocas.value.find((vocaItem) => {
    return vocaItem.words.find((word) => word.wordName === basicData.value.word_name);
  });
});

// 音标的其他项
const isShowOther = computed(() => {
  return !(basicData.value.ph_en || basicData.value.ph_am) && basicData.value.ph_other;
});

// 单词所属类型
const wordTagText = computed(() => {
  const wordTag = basicData.value.word_tag;
  let text = '';

  if (wordTag && wordTag instanceof Array) {
    const { length } = wordTag;
    wordTag.forEach((item, index) => {
      switch (item) {
        case 0:
          text += '考研';
          break;
        case 1:
          text += 'CET4';
          break;
        case 2:
          text += 'CET6';
          break;

        case 3:
          text += 'GRE';
          break;

        case 4:
          text += 'TOEFL';
          break;

        case 5:
          text += 'IELTS';
          break;
        case 6:
          text += '高考';
          break;
        default:
          break;
      }

      if (length - 1 !== index) {
        text += ' / ';
      }
    });
  }

  return text;
});

// 呼出单词添加面板
const showAddPanel = () => {
  if (curWordInItem.value) return;
  isShowPop.value = true;
};

// 向单词本添加新单词
const addNewWord = (vocaName: string) => {
  isShowPop.value = false;
  store.dispatch('vocaModule/addNewWordAction', { vocaName, word: basicData.value.word_name });
};
</script>

<style lang="scss">
.basic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .word-name {
    font-size: 32px;
    font-weight: 600;
    line-height: 52px;
  }
  .add-glossary {
    font-size: 13px;
    width: 88px;
    line-height: 28px;
    height: 28px;
    border-radius: 16px;
    background-color: $ContentBkColor;

    span {
      vertical-align: middle;
    }
    .push-icon {
      display: inline-block;
      font-size: 16px;
      color: $MainColor;
      margin-right: 3px;
    }
  }
}
.word-tag {
  margin-top: 15px;
  font-size: 12px;
  color: $SecondaryFontColor;
}
.phonetic-symbol {
  display: flex;
  margin-top: 5px;
  font-size: 14px;
  color: darken($SecondaryFontColor, $amount: 20%);
  & > div:not(:last-child) {
    margin-right: 20px;
  }
}
.word-frequence {
  margin-top: 10px;
  font-size: 16px;
  .light-star {
    color: $MainColor;
  }
  .dark-star {
    color: $SecondaryFontColor;
  }
}
</style>
