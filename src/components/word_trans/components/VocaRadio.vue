<template>
  <div class="voca-radio" v-if="vocaList.length">
    <div class="radio-group-wrapper">
      <van-radio-group v-model="checked">
        <van-cell-group>
          <van-cell
            clickable
            :title="vocaListItem.name"
            @click="selectedItem(vocaListItem.name)"
            v-for="vocaListItem in vocaList"
            :key="vocaListItem.name"
          >
            <template #right-icon>
              <van-radio :name="vocaListItem.name" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="btn-wrapper">
      <van-button round block type="primary" @click="addNewWord">添加</van-button>
    </div>
  </div>
  <div class="no-voca" v-else>
    <p>您还没有创建单词本</p>
  </div>
</template>
<script setup lang="ts">
import { ref, toRef, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const emit = defineEmits<{(e: 'addWordClick', vocaName: string): void}>();
const vocaList = toRef(store.state.vocaModule, 'vocaList');

const checked = ref('');

const selectedItem = (vocaName: string) => {
  checked.value = vocaName;
};

const addNewWord = () => {
  emit('addWordClick', checked.value);
};
</script>

<style lang="scss">
.voca-radio {
  margin: 55px 0 20px;
  .radio-group-wrapper {
    overflow-y: auto;
    max-height: calc(44px * 4.5);
  }
  .btn-wrapper {
    width: 260px;
    margin: 20px auto;
  }
}
.no-voca {
  line-height: 100px;
  text-align: center;
}
</style>
