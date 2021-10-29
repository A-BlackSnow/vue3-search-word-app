<template>
  <div class="main-floor">
    <div
      class="function-item"
      v-for="func in funcList"
      :key="func.title"
      @click="clickFuncHandler(func.title, func.path)"
    >
      <div class="function-icon">
        <van-icon :class="`iconfont ${func.iconName}`" color="#000" />
      </div>
      <p class="function-name">{{ func.title }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import funcList from './config';

const router = useRouter();
const clickFuncHandler = (title: string, path: string) => {
  router.push({
    name: 'Other',
    params: { title, name: path },
  });
};
</script>

<style lang="scss" scoped>
.main-floor {
  font-size: 12px;
  display: flex;
  justify-content: space-around;

  .function-item {
    .function-icon {
      font-size: 24px;
      text-align: center;
      margin-bottom: 8px;
    }
    .function-name {
      color: $SecondaryFontColor;
    }
  }
}
</style>
