<template>
  <div class="custom-empty">
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      :description="$attrs.description"
    />
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.custom-image .van-empty__image {
    width: 60px;
    height: 60px;
}
</style>
