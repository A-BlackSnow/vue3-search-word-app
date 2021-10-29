<template>
  <div class="other">
    <my-header :title="$route.params.title"></my-header>
    <div class="content">
      <h2 class="title">当前页面正在施工中...</h2>
      <van-image
        class="img-box"
        lazy-load
        src="https://cos.ianran.cn/project/images/other/1633512956811.gif"
      ></van-image>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyHeader from '@/components/Header.vue';

</script>

<style lang="scss" scoped>
.other .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 46px);
  .title {
    color: #ff4299;
  }
  .img-box {
    width: 200px;
    height: 200px;
  }
}
</style>
