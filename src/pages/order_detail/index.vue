<template>
  <div class="container no-header">
    <title title="订单详情"></title>
    <div class="address">
      <div class="address_base">
        {{address.name}}<span>{{address.mobile}}</span>
      </div>
      <div class="address_info">{{address.province}}{{address.city}}{{address.district}}{{address.address}}</div>
    </div>
    <div class="title">南屋北舍</div>
    <div class="item" v-for="item in order" :key="item.id">
      <div class="item_base">
        <div class="name">商品：{{item.good_name}}</div>
        <div class="price">￥{{item.shop_price}}</div>
      </div>
      <div class="item_info">
        <div class="item_info-img" :style="'background-image:url('+item.product_img+')'"></div>
        <div class="item_info-detail">
          <div class="name">
            {{item.product_name}}
          </div>
          <div class="number">
            &times;{{item.number}}
          </div>
        </div>
      </div>
    </div>
    <div class="total">合计：￥{{total}}</div>
    <div class="submit" @click="toBuy">去支付</div>
  </div>
</template>

<script>
import {getOrderDetail, getOrderJssdk} from './api.js'
import title from 'src/components/title.vue'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      order: {},
      address: {}
    }
  },
  mixins: [base],
  onShow () {
    getOrderDetail(this.$root.$mp.query.id).then(res => {
      this.order = res.orderGood
      this.address = res.orderUser
      this.orderInfo = res.orderInfo
    })
  },
  components: {
    title
  },
  computed: {
    total () {
      let res = 0
      this.order.length > 0 && this.order.forEach(val => {
        res += val.number * val.shop_price
      })
      return res.toFixed(2)
    }
  },
  methods: {
    toBuy () {
      getOrderJssdk(this.orderInfo.id).then(res => {
        wx.requestPayment({
          ...res,
          success: function (res) {
            wx.showToast({
              title: '支付成功'
            })
            wx.navigateTo({
              url: `/pages/order_detail/success/main`
            })
          },
          fail: function (res) {
          }
        })
      })
    }
  },

  created () {

  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.title{
  margin: 0 30/@bs;
  margin-top: 20/@bs;
  border-bottom: 1/@bs solid #aaa;
  color: #333;
  font-size: 24/@bs;
  line-height: 60/@bs;
}
.address{
  overflow: hidden;
  padding: 20/@bs 30/@bs;
  border-bottom: 8/@bs solid #FF434C;
  background-color: #ebebeb;
  color: #333;
  font-size: 24/@bs;
  &_base{
    margin-bottom: 10/@bs;
    line-height: 30/@bs;
    span{
      margin-left: 30/@bs;
    }
  }
  &_btn{
    display: flex;
    float: right;
    align-items: center;
    justify-content: center;
    height: 30/@bs;
    color: rgba(0,0,0,0.6);
    image{
      margin-left: 5/@bs;
      width: 30/@bs;
      height: 16/@bs;
    }
  }
  &_new{
    margin: 0 auto;
    width: 200/@bs;
    height: 50/@bs;
    border-radius: 25/@bs;
    background-color: #FF434C;
    color: #fff;
    color: #fff;
    text-align: center;
    font-size: 24/@bs;
    line-height: 50/@bs;
  }
}
.total{
  margin-top: 20/@bs;
  padding: 0 30/@bs;
  color: #FF434C;
  text-align: right;
  font-weight: bold;
  font-size: 30/@bs;
}
.submit{
  margin: 40/@bs auto;
  width: 380/@bs;
  height: 50/@bs;
  border-radius: 25/@bs;
  background-color: #FF434C;
  color: #fff;
  text-align: center;
  font-size: 30/@bs;
  line-height: 50/@bs;
}
.item{
  margin: 0 30/@bs;
  padding: 15/@bs 0;
  border-bottom: 1/@bs solid #bbbbbb;
  &_base{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20/@bs;
    color: #000;
    font-size: 24/@bs;
    &-price{
      font-weight: bold;
    }
  }
  &_info{
    display: flex;
    justify-content: space-between;
    font-size: 20/@bs;
    &-img{
      flex: 0 0 120/@bs;
      margin-right: 20/@bs;
      width: 120/@bs;
      height: 120/@bs;
      background-color: #ebebeb;
      background-position: center;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    &-detail{
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      color: #333;
    }
  }
}
</style>
