<template>
  <div class="daily-sentence">
    <div class="sentence-wrap" @click="toDailyPage">
      <div class="sentence-date">
        <span class="date-day">02</span>
        <span class="date-month">October.2021</span>
      </div>
      <div class="sentence">
        <p>It's time to start living the life you've imagined!</p>
      </div>
      <button class="guide-btn">点击跟读</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const toDailyPage = () => {
  router.push({ name: 'Other', params: { name: 'daily', title: '每日例句' } });
};
</script>

<style lang="scss" scoped>
.daily-sentence {
  width: 100%;
  height: 100px;
  margin-bottom: 28px;
  font-size: 12px;
  .sentence-wrap {
    position: absolute;
    left: 0;
    right: 0;
    height: 100px;
    padding: 0 15px;
    background-color: $MainColor;
    color: #fff;
    .sentence-date {
      line-height: 28px;
      height: 28px;
      .date-day {
        font-size: 16px;
        font-weight: 600;
      }
      .date-month {
        padding-left: 4px;
      }
    }
    .sentence {
      width: 210px;
      height: 44px;
      line-height: 22px;
      margin-top: -3px;
    }
    .guide-btn {
      width: 68px;
      line-height: 20px;
      margin-top: 6px;
      border-radius: 11px;
      text-align: center;
      background-color: #fff;
      color: #000;
    }
  }
}
</style>
