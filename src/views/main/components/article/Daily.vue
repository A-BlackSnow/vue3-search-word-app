<template>
  <div class="daily-sentence">
    <div class="sentence-wrap">
      <van-swipe lazy-render :show-indicators="false" autoplay=3000>
        <van-swipe-item v-for="senItem in sentences" :key="senItem._id">
          <div class="sentence-panel">
            <img class="banner-image" :src="senItem.pictures.banners" />
            <div class="sentence-show">
              <h2 class="sent-date">
                <i class="notable">{{formatDateToString(senItem.title)}}</i>
                <span>{{formatDateToNumber(senItem.title)}}</span>
              </h2>
              <div class="sent-text">
                <p class="origin-sent">{{ senItem.content }}</p>
                <p class="trans-sent">{{ senItem.note }}</p>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ISentenceData } from '@/api/daily/type';
import getDailyData from '@/api/daily/daily';

const sentences = ref<ISentenceData[]>([]);

onMounted(async () => {
  const responseData = await getDailyData();

  if (responseData.code === 200 && responseData.data.sentences.length) {
    sentences.value = responseData.data.sentences;
  }
});

const formatDateToString = (date: string) => {
  const time = new Date(date);
  return time.toLocaleDateString('en-US', { month: 'long', weekday: 'long' }).split(' ').reverse().join(' ');
};

const formatDateToNumber = (date: string) => {
  const time = new Date(date);
  const noFullDate = time.getDate().toString();
  const fullDate = noFullDate.length === 1 ? `0${noFullDate}` : noFullDate;
  const year = time.getFullYear();
  return ` ${fullDate}th ${year}`;
};

</script>

<style lang="scss">
.daily-sentence {
  width: 100%;
  height: 130px;
  margin-bottom: 28px;
  font-size: 12px;
  .sentence-wrap {
    position: absolute;
    left: 0;
    right: 0;
    height: 130px;
    background-color: $MainColor;
    color: #fff;
  }
}
.sentence-panel {
  position: relative;
  .banner-image {
    display: block;
    width: 100%;
    height: 130px;
  }
  .sentence-show {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.25);
    color: #fff;
    .sent-date {
      font-size: 14px;
      .notable {
        font-size: 22px;
      }
      span {
        margin-left: 5px;
        vertical-align: text-bottom;
        color: #f1f1f1;
      }
    }
    .sent-text {
      position: absolute;
      bottom: 0;
      margin-bottom: 7px;
    }
  }
}
</style>
