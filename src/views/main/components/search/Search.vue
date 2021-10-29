<template>
  <div class="word-search">
    <van-search disabled placeholder="请输入需要搜索的单词" shape="round"></van-search>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.word-search {
  border-radius: 7px;
  overflow: hidden;
  .van-search__content {
    padding-left: 10px;
    background-color: transparent;
    .van-icon {
      color: $MainColor;
      font-size: 26px;
    }
    .van-field__control::placeholder {
      font-size: 14px;
    }
  }
}
</style>
