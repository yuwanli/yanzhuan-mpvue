<template>
  <div class="header">
    <div class="icon like"></div>
    <!-- <image @click="openWeb" class="icon like" src="/static/images/like.png"></image> -->
    <div class="center">
      <image class="icon logo" src="/static/images/header.png"></image>
      <div class="circle"></div>
    </div>
    <div @click="goToInfo" class="message">
      <image class="icon info" src="/static/images/info.png"></image>
      <div v-if="user.message" class="message-label"></div>
    </div>

  </div>
</template>

<script>
import store from 'src/store'
export default {
  data () {
    return {
    }
  },
  computed: {
    user: () => {
      return store.state.user
    }
  },
  methods: {
    openWeb () {
      wx.navigateTo({
        url: `/pages/web_view/main`
      })
    },
    goToInfo () {
      wx.navigateTo({
        url: `/pages/info/main`
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.header{
  position: fixed;
  top:0;
  left: 0;
  z-index:1000000;
  display: flex;
  align-items:flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30/@bs;
  width: 100%;
  height: 100/@bs;
  background-color: #806ffd;
  box-shadow: 0 0 10/@bs #806ffd;
  color: #fff;
  .icon{
    &.like{
      width: 32/@bs;
      height: 28/@bs;
      margin-top: 34/@bs;
    }
    &.info{
      width: 28/@bs;
      height: 32/@bs;
    }
    &.logo{
      width: 142/@bs;
      height: 159/@bs;
    }
  }
  .message{
    position: relative;
    width: 28/@bs;
    height: 32/@bs;
    margin-top: 34/@bs;
    transform-origin: top center;
    &-label{
      position: absolute;
      top:0;
      right: 0;
      width: 16/@bs;
      height: 16/@bs;
      border-radius: 50%;
      background-color: red;
    }
  }
  .center{
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: 170/@bs;
    position: relative;
    .circle{
      width: 170/@bs;
      height: 170/@bs;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background-color: #806ffd;
      border-radius: 50%;
      z-index: -1;
    }
    p{
      margin-top: 10/@bs;
      color: #181a1b;
      font-size: 20/@bs;
    }
  }
}

</style>
