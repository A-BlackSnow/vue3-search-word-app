<template>
  <div class="voca-header">
    <div class="title">
      <h1>我的生词本</h1>
    </div>
    <div class="operation-btns">
      <van-popover :actions="optionList" v-model:show="isShowPop" @select="changeSortType">
        <template #reference>
          <button class="sort-btn">
            <van-icon class="iconfont icon-sorting"></van-icon>
            <span class="btn-text">排序</span>
          </button>
        </template>
      </van-popover>
      <button class="create-btn" @click="operateDialog('open')">
        <van-icon class="iconfont icon-add"></van-icon>
        <span class="btn-text">创建</span>
      </button>
    </div>
    <van-dialog :show-confirm-button="false" title="请输入单词本名称" v-model:show="isShowDialog">
      <template #default>
        <div class="dialog-content">
          <div class="dialog-input-wrap">
            <input type="text" v-model="vocaName" />
            <div class="dialog-tips-text" v-if="errorTips">{{ errorTips }}</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-btns">
          <button @click="operateDialog('close')">取消</button>
          <button :style="{ color: confirmTextColor }" @click="submitNewVocaName">确定</button>
        </div>
      </template>
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import type { IStoreType } from '@/store/type';

const store = useStore<IStoreType>();
const vocaName = ref('');
const isShowDialog = ref(false);
const isShowPop = ref(false);

// 选项列表数据
const optionList = computed(() => {
  const { sortType } = store.state.vocaModule;
  return [
    {
      text: '时间降序',
      disabled: sortType === 'timeDe',
      sortType: 'timeDe',
    },
    {
      text: '时间升序',
      disabled: sortType === 'timeA',
      sortType: 'timeA',
    },
    {
      text: '名称降序',
      disabled: sortType === 'nameDe',
      sortType: 'nameDe',
    },
    {
      text: '名称升序',
      disabled: sortType === 'nameA',
      sortType: 'nameA',
    },
  ];
});

// 根据选项重新对数据进行排序
const changeSortType = (action: { text: string, disabled: boolean, sortType: string }) => {
  store.commit('vocaModule/changeSortType', { sortType: action.sortType });
};

// 错误内容的提示
const errorTips = computed(() => {
  const charRule = /([^\w|\u4e00-\u9fa5])+/;
  const { length } = vocaName.value;

  if (length > 8) {
    return '单词本名称8个字符以内';
  }

  if (charRule.test(vocaName.value)) {
    return '单词本名称只能包含汉字、数字、字母';
  }

  if (store.state.vocaModule.vocaList.find((vocaItem) => vocaItem.name === vocaName.value)) {
    return '不能与已经创建的单词本名称相同';
  }

  return '';
});

// 是否允许向服务器提交数据
const isAllowSubmit = computed(() => {
  const { length } = vocaName.value;
  return length && !errorTips.value;
});

// 动态计算确定按钮颜色
const confirmTextColor = computed(() => {
  return isAllowSubmit.value ? '' : '#ababab';
});

// 弹出、隐藏输入框
const operateDialog = (actionType: 'close' | 'open') => {
  if (actionType === 'close') {
    isShowDialog.value = false;
  } else {
    isShowDialog.value = true;
  }
};

// 提交数据至服务器
const submitNewVocaName = async () => {
  if (isAllowSubmit.value) {
    operateDialog('close');
    const isAdded = await store.dispatch('vocaModule/addNewVocaAction', { newVocaName: vocaName.value });
    if (isAdded) {
      vocaName.value = '';
    }
  }
};
</script>

<style lang="scss">
.voca-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -10px -10px 0;
  padding: 10px 10px 0;
  color: #000;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
  .title {
    h1 {
      font-size: 22px;
      font-weight: 600;
      line-height: 58px;
    }
  }
  .operation-btns {
    display: flex;
    font-size: 13px;
    font-weight: 600;

    button {
      color: $MainColor;
      display: flex;
      align-items: center;
      &.sort-btn {
        margin-right: 18px;
      }
    }
    .btn-text {
      margin-left: 4px;
    }
    .iconfont {
      border: 1px solid;
      border-radius: 50%;
      padding: 1px;
    }
  }
}
.dialog-content {
  position: relative;
  .dialog-input-wrap {
    box-sizing: border-box;
    width: 80%;
    padding: 0 12px;
    margin: 16px auto 28px;
    border: 1px solid $MainColor;
    border-radius: 5px;
    input {
      font-size: 14px;
      width: 100%;
      line-height: 32px;
      border-width: 0;
    }
  }
  .dialog-tips-text {
    position: absolute;
    color: red;
    text-align: center;
    font-size: 14px;
  }
}

.dialog-btns {
  border-top: 1px solid #ebebeb;
  button {
    width: 50%;
    height: 42px;
    &:last-child {
      border-left: 1px solid #ebebeb;
      color: $MainColor;
    }
  }
}
</style>
