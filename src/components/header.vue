<template>
  <div class="header">
    <!-- <div class="icon like"></div> -->
    <!-- <image @click="openWeb" class="icon like" src="/static/images/like.png"></image> -->
    <div class="center">
      <image class="icon logo" src="/static/images/logo.png"></image>
      <p>南北农产品 优选平台</p>
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
  align-items:center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30/@bs;
  width: 100%;
  height: 100/@bs;
  background-color: #91bb35;
  box-shadow: 0 0 10/@bs #91bb35;
  color: #fff;
  .icon{
    &.like{
      width: 32/@bs;
      height: 28/@bs;
    }
    &.info{
      width: 28/@bs;
      height: 32/@bs;
    }
    &.logo{
      width: 132/@bs;
      height: 38/@bs;
    }
  }
  .message{
    position: relative;
    width: 28/@bs;
    height: 32/@bs;
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
    p{
      margin-top: 10/@bs;
      color: #181a1b;
      font-size: 20/@bs;
    }
  }
}

</style>
