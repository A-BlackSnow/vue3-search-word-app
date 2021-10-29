<template>
  <div class="word-page">
    <div class="word-head">
      <router-view name="header"></router-view>
    </div>
    <div class="word-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.word-content {
  min-height: calc(100vh - 62px);
  background-color: $ContentBkColor;
  position: relative;
}
</style>
