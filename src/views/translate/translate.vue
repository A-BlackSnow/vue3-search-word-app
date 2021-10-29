<template>
  <div class="trans-page">
    <div class="trans-wrap">
      <my-title></my-title>
      <switcher></switcher>
      <text-input></text-input>
      <text-trans></text-trans>
      <my-tabbar></my-tabbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyTabbar from '@/components/Tabbar.vue';
import MyTitle from './components/Title.vue';
import Switcher from './components/Switcher.vue';
import TextInput from './components/TextInput.vue';
import TextTrans from './components/TextTrans.vue';
</script>

<style lang="scss">
.trans-page {
  background-color: $ContentBkColor;
  min-height: 100vh;
  .trans-wrap {
    background-color: #fff;
  }
}
</style>
