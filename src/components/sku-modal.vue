<template>
  <div class="modal" @click="hide">
    <div class="modal_content" @click.stop>
      <div class="modal_content-img" :style="'background-image:url('+data.thumb+')'"></div>
      <div class="modal_content-base">
        <h1>本次数量:{{data.product_number}}<span class="red">剩余:{{data.remained_number}}</span></h1>
        <p><span>￥</span>{{data.price}}</p>
      </div>
      <div class="modal_content-info">
        {{data.product_name}}
      </div>
      <div class="modal_content-control">
        <span>购买数量</span> <control ref="control" :goods_number="cartNum" :remained_number="data.remained_number"></control>
      </div>
      <div class="modal_content-btn">
        <div class="btn add" @click="addToCart">加入购物车</div>
        <div class="btn right" @click="addAndPay">立即去结算</div>
      </div>
    </div>
  </div>
</template>

<script>
import {cartAdd} from './api.js'
import control from './control.vue'

export default {
  data () {
    return {
      cartNum: 1
    }
  },
  props: ['data'],
  components: {
    control
  },
  methods: {
    hide () {
      this.$emit('hideSku')
    },
    iconClick (str) {
      wx.switchTab({
        url: `/pages/${str}/main`
      })
    },
    addToCart () {
      cartAdd({
        goods_id: this.data.good_id,
        product_id: this.data.product_id,
        goods_number: this.$refs.control.goods_number
      }).then(res => {
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
        this.hide()
      })
    },
    addAndPay () {
      cartAdd({
        goods_id: this.data.good_id,
        product_id: this.data.product_id,
        goods_number: this.$refs.control.goods_number || 1
      }).then(res => {
        // wx.showToast({
        //   title: '加购成功',
        //   icon: 'success',
        //   duration: 2000
        // })
        wx.switchTab({
          url: `/pages/cart/main`
        })
      })
    },
    plus () {
      this.cartData.goods_number += 1
    },
    sub () {
      this.cartData.goods_number -= 1
    }
  }

}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.modal{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0,0,0,0.8);
  &_content{
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    padding: 30/@bs 50/@bs;
    background-color: #fff;
    transform: translateY(-50%);
    &-btn{
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 60/@bs;
      height: 56/@bs;
      .btn{
        flex: 0 0 160/@bs;
        margin: 0 20/@bs;
        width: 160/@bs;
        height: 56/@bs;
        border-radius: 4/@bs;
        background-color: @themeBlack;
        color: #fff;
        text-align: center;
        font-size: 24/@bs;
        line-height: 56/@bs;
        &.right{
          background-color: @darkRed;
        }
      }
    }
    &-info{
      display:inline-block;
      box-sizing: border-box;
      padding: 0 16/@bs;
      height: 36/@bs;
      border: 1/@bs solid #FF575F;
      color: #FF575F;
      font-size: 20/@bs;
      line-height: 34/@bs;
    }
    &-img{
      position: absolute;
      top: -60/@bs;
      left: 50/@bs;
      width: 160/@bs;
      height: 160/@bs;
      border: 1px solid #C3C3C3;
      border-radius: 4/@bs;
      background-color: #fff;
      background-image: url('/static/images/default.jpg');
      background-position: center;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    &-control{
      display: flex;
      align-items: center;
      margin-top: 30/@bs;
      height: 36/@bs;
       color: #333;
      font-size: 24/@bs;
      span{
        margin-right: 24/@bs;
      }
    }
    &-base{
      padding-left: 188/@bs;
      color: #333;
      h1{
        font-size: 20/@bs;
        line-height: 24/@bs;
        .red{
          margin-left: 20/@bs;
          color: #C41414;
        }
      }
      p{
        margin-top: 18/@bs;
        color: #8DB610;
        font-weight: bold;
        font-size: 36/@bs;
        span {
          vertical-align: text-top;
          font-weight: lighter;
          font-size: smaller;
          font-size: 24/@bs;
        }
      }
    }
  }
}
</style>
