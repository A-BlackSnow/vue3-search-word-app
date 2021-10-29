<template>
  <van-tabbar route>
    <van-tabbar-item to="/main">
      搜词
      <template #icon>
        <van-icon class="iconfont icon-query" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/translate">
      翻译
      <template #icon>
        <van-icon class="iconfont icon-translate" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/vocabulary">
      单词本
      <template #icon>
        <van-icon class="iconfont icon-book" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/profile">
      我的
      <template #icon>
        <van-icon class="iconfont icon-user" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup></script>

<style lang="scss" scoped>
.iconfont {
  font-size: 18px;
  margin-bottom: 2px;
}
</style>
