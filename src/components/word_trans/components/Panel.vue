<template>
  <div class="detail-panel">
    <h2 class="panel-title" v-if="props.title">{{props.title}}</h2>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{title?: string}>();
</script>

<style lang="scss">
.detail-panel {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
  .panel-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 36px;
  }
}
</style>
