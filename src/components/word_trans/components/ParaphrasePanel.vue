<template>
  <panel title="常用释义">
    <div class="paraphrase-panel">
      <div class="word-means" v-for="meanClass in means" :key="meanClass.part">
        <h3 class="mean-class">
          <i>{{ meanClass.part }}</i>
        </h3>
        <p class="mean-content">
          <span
            class="mean-item"
            v-for="meanItem in meanClass.means"
            :key="meanItem"
          >{{ meanItem }};&nbsp;</span>
        </p>
      </div>
    </div>
  </panel>
</template>
<script lang="ts" setup>
import { defineProps, toRef } from 'vue';
import Panel from './Panel.vue';
import type { IParaphraseWordData } from '../type';

const props = defineProps<{ means: IParaphraseWordData }>();
const means = toRef(props, 'means');
</script>

<style lang="scss">
.paraphrase-panel {
  padding: 8px 0 12px;
  .word-means {
    display: flex;
    align-items: flex-st;
    font-size: 14px;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    .mean-class {
      min-width: 38px;
    }
  }
}
</style>
