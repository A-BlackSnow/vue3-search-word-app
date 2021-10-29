<template>
  <div class="detail-word">
    <my-header :title="($route.params.wordName as string)"></my-header>
  </div>
</template>
<script setup lang="ts">
import MyHeader from '@/components/Header.vue';
</script>

<style lang="scss">
</style>
