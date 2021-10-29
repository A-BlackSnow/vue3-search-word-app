<template>
  <div class="translation-header">
    <div class="title-wrap">
      <h1 class="title">整句翻译</h1>
      <p class="subtitle">
        <i>
          <span>每</span>
          <span>天</span>
          <span>进</span>
          <span>步</span>
          <span>一</span>
          <span>点</span>
          <span>点</span>
        </i>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.translation-header {
  .title-wrap {
    display: inline-block;
    min-width: 10px;
    margin: 10px 0 10px 10px;
  }
  .title {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    // color: #5f6368;
    color: $MainColor;
  }
  .subtitle {
    display: block;
    width: 96%;
    font-size: 0;
    text-align: justify;
    &::after {
      content: "";
      display: inline-block;
      width: 100%;
    }
    i {
      width: 100%;
      line-height: 14px;
    }
    span {
      font-size: 12px;
      &:nth-child(1) {
        color: #001de9;
      }
      &:nth-child(2) {
        color: #e90000;
      }
      &:nth-child(3) {
        color: orange;
      }
      &:nth-child(4) {
        color: #001de9;
      }
      &:nth-child(5) {
        color: #00e752;
      }
      &:nth-child(6) {
        color: #fd18a1;
      }
      &:nth-child(7) {
        color: #9300ef;
      }
    }
  }
}
</style>
