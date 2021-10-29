<template>
  <div class="profile-page">
    <user-profile></user-profile>
    <func-panel title="常用功能"></func-panel>
    <func-panel title="工具和服务"></func-panel>
    <my-tabbar></my-tabbar>
  </div>
</template>
<script setup lang="ts">
import MyTabbar from '@/components/Tabbar.vue';
import UserProfile from './components/UserProfile.vue';
import FuncPanel from './components/FuncPanel.vue';

</script>

<style lang="scss">
</style>
