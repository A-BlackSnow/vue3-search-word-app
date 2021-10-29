<template>
  <div class="func-panel">
    <div class="func-title">
      <h1>{{props.title}}</h1>
    </div>
    <div class="func-list">
      <div class="func-item" v-for="item in funcList" :key="item.title">
        <a class="func-btn" @click="goFuncPage(item)">
          <van-icon :class="`iconfont icon-${item.iconName}`" color="#ffd19b" />
          <p>{{ item.title }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { useRouter } from 'vue-router';
import funcList from '../config';

const props = withDefaults(defineProps<{ title?: string}>(), { title: '' });
const router = useRouter();
const goFuncPage = (pageInfo: {iconName: string, title: string}) => {
  router.push({
    name: 'Other',
    params: {
      title: pageInfo.title,
      name: pageInfo.iconName,
    },
  });
};

</script>

<style lang="scss">
.func-panel {
  font-size: 12px;
  background-color: #fff;
  margin-top: 28px;
  padding: 0 15px;

  .func-title h1 {
    font-size: 20px;
  }

  .func-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;

    .func-item {
      width: 25%;
      margin-bottom: 22px;

      .func-btn {
        display: flex;
        flex-direction: column;
        align-items: center;

        .iconfont {
          font-size: 26px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
