<template>
  <div class="container">
    <div class="item" v-for="item in list" v-bind:key="item.id" @click="toOrder(item.id)">
      <div>{{item.good_name}} 价格：{{item.ship_price}} 状态：{{status[item.order_status]}}</div>
    </div>
    <div v-if="list && list.length === 0">订单数据为空</div>
  </div>
</template>

<script>
import {getOrderList} from './api.js'
import {base} from 'src/mixins/base.js'

export default {
  data () {
    return {
      status: [0, '未支付', '已取消', '待发货', '已发货', '待评价', '已完成'],
      list: ''
    }
  },
  onShow () {
    getOrderList().then(res => {
      this.list = res.list
    })
  },
  mixins: [base],
  computed: {

  },
  methods: {
    toOrder (id) {
      wx.navigateTo({
        url: `/pages/order_detail/main?id=${id}`
      })
    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.item{
  margin-bottom: 20px;
}
.to-buy{
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: yellowgreen;
  color: #fff;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
}
</style>
