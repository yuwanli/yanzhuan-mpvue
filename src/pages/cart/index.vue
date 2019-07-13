<template>
  <div class="container no-header">
    <title title="购物车"></title>
    <template v-if="cart.length>0">
      <div class="address">
        <template v-if="address.detailInfo">
          <div class="address_base">
            {{address.userName}}<span>{{address.telNumber}}</span>
          </div>
          <div class="address_info">{{address.provinceName}}{{address.cityName}}{{address.countyName}}{{address.detailInfo}}</div>
          <div class="address_btn" @click="openAddress">其他地址<image src="/static/images/icon_down.png"></image></div>
        </template>
        <button v-else class="address_new"  @click="openAddress">新增地址</button>
      </div>
      <div class="title">严妆</div>
      <div class="item" v-for="(item,index) in cart" :key="item.id">
        <div class="item_base">
          <div class="item_base-name">商品：{{item.goods_name}}</div>
          <div class="item_base-price">￥{{item.goods_price}}</div>
        </div>
        <div class="item_info">
          <div class="item_info-img" :style="'background-image:url('+item.product_img+')'"></div>
          <div class="item_info-detail">
            <div class="con name">
              <p>{{item.product_name}}</p>
              <span class="delete" @click="delCart(item.id,index)">删除</span>
            </div>
            <div class="con control">
              <control v-if="item.goods_number" :id="item.id" :goods_number="item.goods_number" :remained_number="item.remained_number" @controlChange="controlChange($event,item)"></control>
              <span class="num">&times;{{item.goods_number}}</span>
            </div>
          </div>
        </div>
      </div>
      <p class="total">合计：￥{{total || 0}}</p>
      <div class="submit" @click="toOrder">去结算</div>
    </template>
    <div class="no-data" v-else>
      <p>购物车为空</p>
      <div class="btn" @click="goIndexPage">去首页看看</div>
    </div>
  </div>
</template>

<script>
import {getCartList, addOrder, deleteCart} from './api'
import control from 'src/components/control.vue'
import title from 'src/components/title.vue'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      cart: [],
      address: {},
      initFlag: false
    }
  },
  computed: {
    total () {
      let res = 0
      this.cart.length > 0 && this.cart.forEach(val => {
        res += val.goods_number * val.goods_price
      })
      return res.toFixed(2)
    }
  },
  mixins: [base],
  components: {
    control,
    title
  },
  onLoad () {
    this.init()
    if (wx.getStorageSync('sono-address')) {
      this.address = JSON.parse(wx.getStorageSync('sono-address'))
    }
  },
  onShow () {
    this.initFlag && this.init(true)
  },
  methods: {
    init (hideLoading) {
      getCartList(hideLoading).then(res => {
        this.initFlag = true
        res.cart.forEach(val => {
          val.remained_number = (+val.goods_number) + (+val.remained_number)
        })
        this.cart = res.cart
        if (res.address) {
          this.addressId = res.address.id
        }
      })
    },
    controlChange (num, item) {
      item.goods_number = num
    },
    goIndexPage () {
      wx.switchTab({
        url: `/pages/index/main`
      })
    },
    delCart (id, index) {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确定删除该商品？',
        cancelText: '取消',
        confirmText: '确定',
        confirmColor: '#806ffd',
        success: function (res) {
          if (res.confirm) {
            deleteCart(id).then(res => {
              _this.cart.splice(index, 1)
            })
          }
        }
      })
    },
    getSetting () {
      return new Promise((resolve, reject) => {
        wx.getSetting({
          success (res3) {
            resolve(res3.authSetting)
          },
          fail (err) {
            reject(err)
          }
        })
      })
    },
    openAddress () {
      let _this = this
      if (wx.chooseAddress) {
        wx.chooseAddress({
          success: function (resp) {
            _this.address = resp
            wx.setStorageSync('sono-address', JSON.stringify(resp))
          },
          fail: function () {
            _this.getSetting().then(res => {
              if (!res['scope.address']) {
                wx.showModal({
                  title: '提示',
                  content: '获取用户收货地址信息失败，点击‘确定’授权用户收货地址信息',
                  confirmText: '去授权',
                  success: function (resp2) {
                    if (resp2.confirm) {
                      wx.openSetting({
                        success (res3) {
                          if (res3.authSetting['scope.address']) {
                            _this.openAddress()
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
    toOrder () {
      if (!this.address.detailInfo) {
        wx.showToast({
          title: '请选择你的收货地址',
          icon: 'none'
        })
        return
      }
      addOrder({...this.address}).then(res => {
        wx.navigateTo({
          url: `/pages/order_detail/main?id=${res.order_id}`
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.no-data{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 640/@bs;
  p{
    color: rgba(0,0,0,0.6);
    font-size: 30/@bs;
    line-height: 60/@bs;
  }
  .btn{
    margin-top: 20/@bs;
    width: 200/@bs;
    height: 50/@bs;
    border-radius: 25/@bs;
    background-color: #806ffd;
    color: #fff;
    color: #fff;
    text-align: center;
    font-size: 24/@bs;
    line-height: 50/@bs;
  }
}
.tips{
  margin-top: 10/@bs;
  padding: 0 30/@bs;
  color: #666;
  font-size: 20/@bs;
}
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
  border-bottom: 8/@bs solid #806ffd;
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
  &_info{

  }
  &_btn{
    display: flex;
    float: right;
    align-items: center;
    justify-content: center;
    height: 30/@bs;
    border: 1px solid rgba(0,0,0,0);
    background: none;
    color: rgba(0,0,0,0.6);
    font-size: 24/@bs;
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
    background-color: #806ffd;
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
  color: #806ffd;
  text-align: right;
  font-weight: bold;
  font-size: 30/@bs;
}
.submit{
  margin: 40/@bs auto;
  width: 380/@bs;
  height: 50/@bs;
  border-radius: 25/@bs;
  background-color: #806ffd;
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
      .con{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .control{
        .num{
          color: rgba(0,0,0,0.6);
          font-size: 24/@bs;
        }
      }
      .name {
        line-height: 30/@bs;
        p{
          color: rgba(0,0,0,0.6);
        }
        .delete{
          box-sizing: border-box;
          padding: 0 10/@bs;
          border: 1px solid #aaa;
          color: #FF434C;
          font-size: 20/@bs;
          line-height: 28/@bs;
        }
      }
    }
  }
}
</style>
