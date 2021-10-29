<template>
  <router-view class="router-view" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
