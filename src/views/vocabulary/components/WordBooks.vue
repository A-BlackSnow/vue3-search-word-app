<template>
  <div class="word-books">
    <div class="book-list" v-if="isShowList">
      <div class="book-item" v-for="vocaItem in vocaList" :key="vocaItem.name" @click="goVocaDetail(vocaItem.name)">
        <div class="book-title">
          <h2>{{ vocaItem.name }}</h2>
        </div>
        <div class="book-bottom">
          <span class="words-count">{{ vocaItem.count }}</span>
          <button class="delete-btn" @click.stop="deleteVoca(vocaItem.name)">
            <van-icon class="iconfont icon-delete"></van-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="book-none" v-else>
      <p>您没有创建任何的单词本</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRef, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Dialog } from 'vant';
import type { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const router = useRouter();
const vocaList = toRef(store.state.vocaModule, 'vocaList');
const isShowList = computed(() => !!vocaList.value.length);

onMounted(() => store.dispatch('vocaModule/getAllVocasAction'));

const deleteVoca = (deleteVocaName: string) => {
  Dialog.confirm({
    title: '是否删除该单词本？',
  }).then(() => {
    store.dispatch('vocaModule/deleteVocaAction', { deleteVocaName });
  }).catch(() => {
    console.log('点击了取消');
  });
};

const goVocaDetail = (vocaName: string) => router.push({ name: 'WordList', query: { voca_name: vocaName } });
</script>

<style lang="scss" >
.word-books {
  padding-top: 10px;
  .book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .book-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 110px;
    height: 140px;
    padding: 10px;
    border-radius: 12px;
    background-color: $MainColor;
    color: #fff;
    margin-top: 10px;
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      margin-top: 0;
    }

    &:last-child:nth-child(3n-1) {
      margin-right: calc(110px + 12.5px);
    }
    .book-title {
      h2 {
        font-size: 15px;
      }
    }
    .book-bottom {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
  }
  .book-none {
    margin-top: 180px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: $SecondaryFontColor;
  }
}
</style>
