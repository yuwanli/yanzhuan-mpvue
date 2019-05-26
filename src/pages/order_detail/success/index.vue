<template>
  <div class="container no-header">
    <div class="text">支付成功</div>
      <div class="logo">
        <img src="/static/images/header.png" alt="">
      </div>
      <div class="btn order" @click="toOrder">查看订单</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    toOrder () {
      wx.switchTab({
        url: `/pages/user/main`
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.container{
  position: fixed;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  text-align: center;
  .text{
      margin-top: 100/@bs;
      margin-bottom: 20/@bs;
      color: #000;
      font-weight: bold;
      font-size: 30/@bs;
      line-height: 40/@bs;
    }
    .logo{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 170/@bs;
      height: 170/@bs;
      border-radius: 50%;
      background-color: @themeBlack;
      image{
        width: 142/@bs;
        height: 159/@bs;
      }
    }
    p{
      margin-bottom: 30/@bs;
      color: #699a24;
      font-weight: bold;
      font-size: 28/@bs;
      line-height: 36/@bs;
    }
    .btn{
      box-sizing: border-box;
      margin:30/@bs auto 30/@bs;
      width: 260/@bs;
      height: 50/@bs;
      border: 1/@bs solid #989898;
      border-radius: 25/@bs;
      color: #989898;
      font-size: 24/@bs;
      line-height: 50/@bs;
      &.order{
        border: none;
        background-color: #806ffd;
        color: #fff;
      }
    }
}
</style>
