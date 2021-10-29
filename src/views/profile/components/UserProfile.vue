<template>
  <div class="user-profile">
    <div class="user-avatar">
      <img class="avatar-image" :src="store.state.userInfo.avatar" />
    </div>
    <div class="user-nickname">
      <p class="nickname-text">{{ store.state.userInfo.nickname }}</p>
    </div>
    <div class="user-card">
      <div class="vip-card" @click="goVipPage">
        <div class="card-wrap">
          <div class="left-part">
            <p class="top-text">
              <span class="notable">开通词典会员</span> 尽享查词体验
            </p>
            <p class="bottom-text">开通VIP年卡，牛津柯林斯朗文无限查</p>
          </div>
          <div class="right-part">
            <button>开通会员</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { IStoreType } from '@/store/type';

const router = useRouter();
const store = useStore<IStoreType>();

const goVipPage = () => {
  router.push({
    name: 'Other',
    params: {
      title: '开通会员',
      name: 'vip',
    },
  });
};
</script>

<style lang="scss">
.user-profile {
  padding-top: 40px;
  background-color: $ContentBkColor;
  width: 100%;
  overflow-x: hidden;

  .user-avatar {
    width: 102px;
    height: 102px;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;

    .avatar-image {
      width: 100%;
      height: 100%;
    }
  }
  .user-nickname {
    margin-top: 6px;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
  }

  .user-card {
    background-color: #fff;
    margin-top: 30px;
  }
  .vip-card {
    color: #fff;
    font-size: 12px;
    width: 160%;
    position: relative;
    left: -30%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    background-color: $ContentBkColor;
    overflow: hidden;

    .card-wrap {
      box-sizing: border-box;
      width: calc(375px - 30px);
      margin: auto;
      padding: 15px 15px 30px;
      background-color: #160024;
      border-radius: 12px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top-text {
      font-size: 14px;
      .notable {
        color: #ffd19b;
      }
    }

    .bottom-text {
      margin-top: 3px;
      font-size: 10px;
    }

    .right-part {
      button {
        font-size: 12px;
        width: 68px;
        line-height: 28px;
        border-radius: 14px;
        color: #47215a;
        background-color: #ffd19b;
      }
    }
  }
}
</style>
