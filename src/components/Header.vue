<template>
  <div class="header">
    <van-nav-bar left-arrow :border="props.border" @click-left="backBtnClick">
      <template #title>
        <slot>
          <h2 class="page-title">{{ props.title }}</h2>
        </slot>
      </template>
    </van-nav-bar>
  </div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { useRouter } from 'vue-router';

interface IPropsData {
  title?: string;
  border?: boolean;
  backPath?: string;
}
const props = withDefaults(defineProps<IPropsData>(), { title: '', border: true, backPath: '' });
const router = useRouter();

const backBtnClick = () => {
  if (props.backPath) {
    router.push(props.backPath);
  } else {
    router.back();
  }
};
</script>

<style lang="scss">
.header {
  .page-title {
    font-size: 18px;
    line-height: 46px;
    font-weight: 600;
  }
}
</style>
