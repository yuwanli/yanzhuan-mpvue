<template>
  <div class="container no-header">
    <div class="con">
      <div class="text">支付成功</div>
      <image src="/static/images/logo2.png"></image>
      <p>sono.mobi</p>
      <div class="btn order" @click="toOrder">查看订单</div>
    </div>
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
    image{
      display: block;
      margin: 0 auto;
      width: 104/@bs;
      height: 104/@bs;
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
      margin:0 auto 30/@bs;
      width: 260/@bs;
      height: 50/@bs;
      border: 1/@bs solid #989898;
      border-radius: 25/@bs;
      color: #989898;
      font-size: 24/@bs;
      line-height: 50/@bs;
      &.order{
        border: none;
        background-color: #ff434c;
        color: #fff;
      }
    }
}
</style>
