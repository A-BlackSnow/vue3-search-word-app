<template>
  <div class="translate-res" v-if="isShow">
    <p class="trans-text">{{store.state.translateModule.toText}}</p>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ISubState } from '@/store/type';

const store = useStore<ISubState>();
const isShow = computed(() => {
  return !!store.state.translateModule.fromText;
});

</script>

<style lang="scss" scoped>
.translate-res {
  font-size: 22px;
  line-height: 28px;
  min-height: 84px;;
  color: #fff;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
  background-color: $MainColor;
  .trans-text {
    white-space: pre-line;
  }
}
</style>
