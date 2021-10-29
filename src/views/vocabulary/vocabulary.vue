<template>
  <div class="vocabulary-page">
    <div class="voca-wrap">
      <voca-header></voca-header>
      <word-books></word-books>
      <my-tabbar></my-tabbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyTabbar from '@/components/Tabbar.vue';
import VocaHeader from './components/VocaHeader.vue';
import WordBooks from './components/WordBooks.vue';
</script>

<style lang="scss">
.vocabulary-page {
  .voca-wrap {
    padding: 10px;
    overflow: hidden;
  }
}
</style>
