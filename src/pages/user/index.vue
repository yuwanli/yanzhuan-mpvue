<template>
  <div class="container no-header">
    <scroll-view class="list" scroll-y="true" enable-back-to-top=true  @scrolltolower="loadData(true)">
      <div class="top" style="background-image: url(https://image.sono.mobi/yanzhuang/static/images/user_bg.jpg)">
        <image class="avatar" :src="userInfo.user.self_img"></image>
        <div class="content">
          <span class="name">{{userInfo.user.nick_name}}</span>
          <!-- <span class="num">订单数:{{userInfo.user.order_num}}</span> -->
        </div>
      </div>
      <div class="order_num">订单数量（{{userInfo.user.order_num || 0}}）</div>
      <div v-for="item in list" v-bind:key="item.order_sn" class="item">
        <div class="item_base">
          <span class="num">订单号：{{item.order_sn}}</span>
          <p @click.stop="toOrder(item.id)" class="btn" v-if="item.order_status==='1'">去支付</p>
          <span v-else class="status">{{status[item.order_status-1]}}</span>
        </div>
        <div class="item_detail">
          <div class="item_detail-wrapper" @click="toDetail(good.good_id)" v-for="(good,idx) in item.good_list" v-bind:key="idx">
            <div class="item_detail-name">
                <p class="goods">商品：{{good.good_name}}</p>
                <!-- <p @click.stop="toOrder(item.id)" class="btn" v-if="item.order_status==='1'">去支付</p> -->
            </div>
            <div class="item_detail-box">
              <div class="picBox" :style="'background-image:url('+good.good_img+')'"></div>
              <div class="desc">
                <div class="time">下单时间：{{item.timeStr}}</div>
                <div class="price">{{good.shop_price}} <span>x{{good.number}} </span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="item_total">
          <div class="item_total-info">
            <span>共{{item.total_num}}件商品</span>
            <span v-if="item.order_freight !== '0'">快递：{{item.order_freight}}</span>
          </div>
          <p class="item_total-amount">合计: {{item.order_amount}}</p>
        </div>
      </div>
      <sono-loading v-show="initFlag" :hasMore="hasMore"></sono-loading>
    </scroll-view>
  </div>
</template>

<script>
import {getOrderList} from './api.js'
import loading from 'src/components/loading.vue'
import {base} from 'src/mixins/base.js'
import store from 'src/store'
export default {
  data () {
    return {
      status: [
        '未支付', '已取消', '待发货', '已发货', '待评价', '已完成'
      ],
      nowTime: new Date().getTime(),
      list: [],
      page: 1,
      pageNum: 10,
      loading: false,
      hasMore: true,
      initFlag: false
    }
  },
  computed: {
    userInfo: () => {
      return store.state.user || {user: {}}
    }
  },
  components: {
    'sono-loading': loading
  },
  mixins: [base],
  onLoad () {
    this.init()
  },
  onShow () {
    this.list = []
    this.page = 1
    this.hasMore = true
    this.loading = false
    this.initFlag && this.init(true)
  },
  methods: {
    getTotalNum (list) {
      return 2
      // return list.reduce((res, item) => {
      //   return res + (+item.number)
      // }, 0)
    },
    init (hideLoading) {
      this.loadData(hideLoading)
    },
    formatDate (s) {
      let date = new Date(s)
      let y = date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear()
      let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return y + '-' + m + '-' + d + '  ' + h + ':' + min
    },
    formatTime (a, n) {
      let add = parseInt(a) * 1000
      let now = parseInt(n) * 1000
      if (now - add > 24 * 60 * 60 * 1000) { // 超过24小时
        return this.formatDate(add)
      } else if (now - add > 60 * 60 * 1000) { // 超过1小时
        return parseInt((now - add) / (60 * 60 * 1000)) + '小时前'
      } else if (now - add > 60 * 1000) { // 超过一分钟
        return parseInt((now - add) / (60 * 1000)) + '分钟前'
      } else {
        return parseInt((now - add) / 1000) + '秒前'
      }
    },
    formatListData (list) {
      let res = list.map(val => {
        val.timeStr = this.formatTime(val.create_time, this.nowTime)
        return val
      })
      return res
    },
    loadData (hideLoading) {
      if (!this.hasMore || this.loading) {
        return
      }
      this.loading = true
      getOrderList(
        {
          page: this.page,
          num: this.pageNum
        },
        hideLoading
      ).then((res) => {
        res.list.map((item) => {
          item.total_num = item.good_list.reduce((total, good) => {
            return total + (+good.number)
          }, 0)
          return item
        })
        this.loading = false
        this.page += 1
        this.list = this.list.concat(this.formatListData(res.list))
        this.hasMore = (res.list.length >= this.pageNum)
        !this.initFlag && (this.initFlag = true)
      }).catch(() => {
        this.loading = false
      })
    },
    toOrder (id) {
      wx.navigateTo({
        url: `/pages/order_detail/main?id=${id}`
      })
    },
    toDetail (id) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.list{
  background-color: #ececec;
}
.top{
  display: flex;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  margin-bottom: 10/@bs;
  padding: 30/@bs;
  height: 190/@bs;
  background-image: url('/static/images/user_bg.jpg');
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .avatar{
    margin-right: 15/@bs;
    width: 130/@bs;
    height: 130/@bs;
    border-radius: 50%;
    background-color: @grayBg;
  }
  .content{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: 130/@bs;
    font-size: 24/@bs;
    line-height: 30/@bs;
    .name{
      color: #fff;
      font-weight: bold;
    }
    .num{
      margin-top: 15/@bs;
      font-size: 20/@bs;
    }
  }
}
.order_num{
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  padding: 0 30/@bs;
  height: 50/@bs;
  background-color: #ebebeb;
  color: #333;
  font-size: 24/@bs;
  line-height: 50/@bs;
}
.list{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
}
.item{
  padding: 15/@bs 0;
  margin-bottom: 15/@bs;
  background-color: #fff;
  &_base{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1/@bs solid #aaa;
    font-size: 20/@bs;
    line-height: 50/@bs;
    margin: 0 30/@bs;
    .btn{
      flex: 0 0 116/@bs;
      box-sizing: border-box;
      width: 116/@bs;
      height: 36/@bs;
      border-radius: 5/@bs;
      background-color: #806ffd;
      color: #fff;
      text-align: center;
      font-size: 20/@bs;
      line-height: 36/@bs;
    }
  }
  &_total{
    border-top: 1/@bs solid #aaa;
    padding: 10/@bs 32/@bs;
    &-info{
      line-height: 40/@bs;
      font-size: 24/@bs;
      color: #9b9b9b;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &-amount{
      font-size: 32/@bs;
      color: #806ffd;
      text-align: right;
      line-height: 50/@bs;
      font-weight: 500;
    }
  }
  &_detail{
    padding: 0 30/@bs 20/@bs;
    &-wrapper{
      margin-top: 20/@bs;
    }
    &-box{
      display: flex;
      align-items: center;
      height: 120/@bs;
      .picBox{
        margin-right: 20/@bs;
        width: 120/@bs;
        height: 120/@bs;
        border-radius: 4/@bs;
        background-color: @grayBg;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .desc{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 120/@bs;
        .time{
          margin-top: 10/@bs;
          color: #8d8d8d;
          font-size: 20/@bs;
          line-height: 30/@bs;
        }
        .price{
          font-size: 24/@bs;
          color: #806ffd;
          span{
            font-size: 18/@bs;
          }
        }
      }
    }
    &-name{
      display: flex;
      overflow: hidden;
      align-items: center;
      justify-content: space-between;
      flex-wrap: no-wrap;
      width: 100%;
      margin: 10/@bs auto 20/@bs;
      font-size: 24/@bs;
      line-height: 30/@bs;
      .goods{
        margin-right: 15/@bs;
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

    }

  }
}
</style>
