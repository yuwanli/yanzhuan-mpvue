<template>
  <div class="sku">
    <div class="sku_icons">
      <div class="sku_icons-item" @click="iconClick('index')">
        <image class="icon home" src="/static/images/home.png"></image>
        <p>首页</p>
      </div>
      <div class="sku_icons-item" @click="iconClick('cart')">
        <image class="icon cart" src="/static/images/cart.png"></image>
        <p>购物车</p>
      </div>
      <div class="sku_icons-item" @click="iconClick('user')">
        <image class="icon user" src="/static/images/user.png"></image>
        <p>个人中心</p>
      </div>
    </div>
    <template v-if="data.remained_number == 0">
      <div class="sku_item noMore">
        该产品已售罄
      </div>
    </template>
    <template v-else>
       <div class="sku_item cart" @click="openSku">
        加入购物车
      </div>
      <div class="sku_item buy" @click="addAndPay">
        立即购买
      </div>
    </template>

    <sku-modal v-if="ifSku" :data="data" @hideSku="hideSku"></sku-modal>
  </div>
</template>

<script>
import skuModal from './sku-modal.vue'
import {cartAdd} from './api.js'

export default {
  data () {
    return {
      ifSku: false
    }
  },
  props: ['data'],
  components: {
    'sku-modal': skuModal
  },
  methods: {
    iconClick (str) {
      wx.switchTab({
        url: `/pages/${str}/main`
      })
    },
    noMoreClick () {
      wx.navigateTo({
        url: `/pages/reserve/main?id=${this.data.good_id}`
      })
    },
    openSku () {
      this.ifSku = true
    },
    hideSku () {
      this.ifSku = false
    },
    addAndPay () {
      if (parseInt(this.data.remained_number) === 0) {
        wx.showToast({
          title: '商品暂无库存',
          icon: 'none'
        })
        return
      }
      cartAdd({
        goods_id: this.data.good_id,
        product_id: this.data.product_id,
        goods_number: 1
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
    }
  }

}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.sku{
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  height: 80/@bs;
  background-color: @themeBlack;
  box-shadow: 0 0 10/@bs @themeBlack;
  color: #fff;
  &_item{
    display: flex;
    align-items: center;
    flex: 0 0 160/@bs;
    justify-content: center;
    box-sizing: border-box;
    color: rgba(255,255,255,0.5);
    font-size: 24/@bs;
    &.cart{
      border-left: 1/@bs solid rgba(255,255,255,0.2);
      color: #fff;
    }
    &.buy{
      background-color: @darkRed;
      color: #000;
    }
    &.noMore{
      flex: 0 0 320/@bs;
      background-color: #e8e8e8;
      color: #676767;
      span{
        margin-left: 20/@bs;
        text-decoration: underline;
      }
    }
  }
  &_icons{
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 10/@bs;
    padding-left: 20/@bs;
    &-item{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 0 20/@bs;
      .icon{
        width: 45/@bs;
        height: 45/@bs;
      }
      p{
        font-size: 18/@bs;
      }

    }
  }
}
</style>
