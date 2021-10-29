<template>
  <div class="slogan">

    <!-- 按钮 -->
    <button class="switch-slogan" @click="switchHandler">
      <span>{{ statusList[curIndex] }}</span>
      <van-icon name="arrow-down" />
    </button>

    <!-- 弹出层 -->
    <van-popup class="popup" closeable position="bottom" v-model:show="isShow">
      <h3 class="title">请选择你的身份</h3>
      <ul class="status-list">
        <li
          class="select-item"
          v-for="(item, index) in statusList"
          :key="index"
        >
          <button
            class="select-item-btn"
            :class="{ selected: index === curSelectedIndex }"
            @click="selectClickHandler(index)"
          >{{ item }}</button>
        </li>
      </ul>
      <div class="confirm-btn">
        <button @click="confirmClickHandler">确定</button>
      </div>
    </van-popup>

    <!-- 标语 -->
    <h2 class="slogan-text">{{ sloganText }}</h2>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { statusList, sentences } from './config';
import { generateRandomNum } from '@/utils/index';
import getSpecialText from './hooks';
import localCache from '@/utils/cache';

const localIndex = localCache.getCache<number>('state_index') ?? 0;
const isShow = ref(false);
const curSelectedIndex = ref(localIndex);
const curIndex = ref(localIndex);

// 切换显示弹出层
const switchHandler = () => {
  isShow.value = !isShow.value;
};

// 选中不同的阶段
const selectClickHandler = (index: number) => {
  curSelectedIndex.value = index;
};

// 底部确定按钮
const confirmClickHandler = () => {
  isShow.value = false;
  curIndex.value = curSelectedIndex.value;
  localCache.setCache('state_index', curSelectedIndex.value);
};

// 根据选中不同的值动态计算出显示的文本
const sloganText = computed(() => {
  // 如果选中的是“高中”、“四级”、“六级”、“考研”，显示其他。
  if ('高中四级六级考研'.indexOf(statusList[curIndex.value]) !== -1) {
    return getSpecialText(statusList[curIndex.value]);
  }

  const max = sentences.length - 1;
  const index = generateRandomNum(0, max);
  return sentences[index];
});
</script>
<style lang="scss" scoped>
.switch-slogan {
  display: flex;
  align-items: center;
  line-height: 28px;
  padding: 0px 12px;
  border-radius: 14px;

  background-color: rgba(0, 0, 0, 0.07);

  span {
    margin-right: 6px;
  }
}
.title {
  font-size: 18px;
  text-align: center;
  line-height: 52px;
}
.status-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
  .select-item {
    &:last-child {
      margin-right: 117.5px;
    }
    .select-item-btn {
      width: 100px;
      line-height: 28px;
      margin-bottom: 16px;
      border: 1px solid #e1e1e1;
      border-radius: 14px;
      color: #000;

      &.selected {
        color: $MainColor;
        border-color: $MainColor;
      }
    }
  }
}
.confirm-btn {
  text-align: center;
  margin-bottom: 18px;
  button {
    width: 140px;
    line-height: 32px;
    border-radius: 24px;
    color: #fff;
    background-color: $MainColor;

    &:active {
      background-color: darken($MainColor, 5%);
    }
  }
}
.slogan-text {
  line-height: 64px;
  font-weight: 600;
}
</style>
