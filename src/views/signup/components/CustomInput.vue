<template>
  <div class="custom-input">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.custom-input {
  margin-bottom: 25px;
  .van-cell {
    padding-bottom: 22px;
    &::after {
      display: none;
    }
  }
  .van-cell__value {
    margin: 0 15px 0 20px;
    &::before {
      content: "";
      position: absolute;
      bottom: -5px;
      z-index: 10;
      left: 0;
      right: 0;
      height: 1px;
      background-color: $MainColor;
    }
  }
  .van-field__error-message {
    position: absolute;
    margin-top: 2px;
  }
  .iconfont {
    font-size: 22px;
    top: 5px;
    color: $MainColor;
  }
}
</style>
