<template>
  <div class="text-input">
    <div class="text-wrap">
      <textarea
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off"
        role="combobox"
        rows="1"
        placeholder="输入文字"
        ref="textAreaRef"
        v-model="fromText"
      ></textarea>
    </div>
    <div class="right-part">
      <div class="clean-btn">
        <van-icon class="clean-icon" name="cross" v-if="isShowCleanBtn" @click="clearInputValue" />
      </div>
      <span class="font-length">{{ inputValueLength }} / 500</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ref, computed, nextTick, watch,
} from 'vue';
import { useStore } from 'vuex';
import type { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const textAreaRef = ref<HTMLTextAreaElement>();

// 动态计算是否显示清除按钮
const isShowCleanBtn = computed(() => {
  return !!store.state.translateModule.fromText;
});

// 动态计算输入文本的长度
const inputValueLength = computed(() => {
  return store.state.translateModule.fromText.length;
});

// 表单数据与Vuex双向绑定
const fromText = computed<string>({
  get() {
    return store.state.translateModule.fromText;
  },
  set(val) {
    store.commit('translateModule/updateFromText', { val });
  },
});

// 动态计算输入框的高度
const changeHeight = () => {
  const textAreaEl = textAreaRef.value;
  if (!textAreaEl) return;

  if (textAreaEl.scrollHeight > textAreaEl.clientHeight) {
    textAreaEl.style.height = `${textAreaEl.scrollHeight}px`;
  } else {
    textAreaEl.style.height = 'auto';
    textAreaEl.style.height = `${textAreaEl.scrollHeight}px`;
  }
};

// 清空输入框
const clearInputValue = () => {
  store.commit('translateModule/updateFromText', { val: '' });
};

// 输入框内的值发生变化后，重新计算输入框的高度
watch(() => store.state.translateModule.fromText, () => {
  nextTick(() => changeHeight());
  store.dispatch('translateModule/translationReq');
});

</script>

<style lang="scss" scoped>
.text-input {
  display: flex;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
}
.text-wrap {
  flex: 1;
  margin-right: 15px;
  textarea {
    font-size: 22px;
    color: #3c4043;
    border: none;
    width: 100%;
    overflow: hidden;
    padding: 0;
    resize: none;
    white-space: pre-wrap;
    line-height: 28px;
    vertical-align: middle;
    min-height: 84px;
  }
}
.right-part {
  width: 58px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: right;
  .clean-icon {
    font-size: 22px;
    padding: 5px;
    color: #3c4043;
  }
  .font-length {
    color: #5f6368;
    white-space: nowrap;
  }
}
</style>
