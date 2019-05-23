<template>
  <div class="container">
    <sono-header></sono-header>
    <div class="baseInfo">
      <h1>{{data.title}}</h1>
      <p>{{data.price}}</p>
    </div>
    <div class="content">
      <wxParse :content="data.content" />
    </div>

    <sku-menu :data="data"></sku-menu>
    <!-- <div class="add-cart" @click="addCart">加购物车</div>
    <div class="to-cart" @click="toCart">去购物车</div> -->
  </div>
</template>

<script>
import {getDetail} from './api'
import header from 'src/components/header.vue'
import skuMenu from 'src/components/sku-menu.vue'
import wxParse from 'mpvue-wxparse'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      data: {
        content: '<p style="text-align:center">sono</p>'
      }
    }
  },
  computed: {
  },
  components: {
    wxParse,
    'sono-header': header,
    'sku-menu': skuMenu
  },
  mixins: [base],
  onLoad () {
    getDetail(this.$root.$mp.query.id).then(res => {
      this.data = res
      this.good_id = res.good_id
      this.product_id = res.product_id
    })
  },
  methods: {
    // addCart () {
    //   cartAdd({
    //     goods_id: this.good_id,
    //     product_id: this.product_id,
    //     goods_number: 1
    //   }).then(res => {
    //     wx.showToast({
    //       title: '加购成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   })
    // },
    toCart () {
      wx.switchTab({
        url: '/pages/cart/main'
      })
    }
  },
  onShareAppMessage () {
    return {
      title: this.data.title,
      path: `/pages/detail/main?id=${this.$root.$mp.query.id}`
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
@import url("~mpvue-wxparse/src/wxParse.css");
.container{
  background-color: @grayBg;
  padding-bottom: 80/@bs;
}
.content{
  background-color: #fff;
}

.baseInfo{
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15/@bs;
  height: 140/@bs;
  background-color: #fff;
  h1{
    color: @blackColor;
    font-size: 30/@bs;
    line-height: 42/@bs;
  }
  p{
    color: @darkRed;
    font-size: 30/@bs;
    line-height: 42/@bs;
  }
}
</style>
