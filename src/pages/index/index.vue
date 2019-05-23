<template>
    <div class="container">
      <sono-header></sono-header>
      <swiper class="swiper" :indicator-dots="true" :circular="true" indicator-color="rgba(0,0,0,0.5)" indicator-active-color="#b6e429">
        <block v-for="item in images" v-bind:key="item.id">
          <swiper-item  @click="clickHandle(item.id)">
            <img mode="aspectFill" class="swiper-img" :src="item.image" />
          </swiper-item>
        </block>
      </swiper>
      <div class="title">精选推荐</div>
      <div class="listCon">
        <item v-for="item in list" v-bind:key="item.id" :item='item'></item>
      </div>
    </div>
</template>

<script>
import {getIndexList} from './api'
import item from 'src/components/item.vue'
import header from 'src/components/header.vue'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      list: [],
      images: [],
      initFlag: false
    }
  },
  mixins: [base],
  components: {
    item,
    'sono-header': header
  },
  computed: {
  },
  onLoad () {
    this.init()
  },
  onShow () {
    this.initFlag && this.init(true)
  },
  methods: {
    init (hideLoading) {
      getIndexList(hideLoading).then(res => {
        this.list = res.recommend
        this.images = res.image
        this.initFlag = true
      })
    },
    clickHandle (id) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    },
    orderList () {
      wx.navigateTo({
        url: '/pages/order_list/main'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.swiper{
  width: 640/@bs;
  height: 330/@bs;
  background-color: #d9d9d9;
  &-img{
    width: 640/@bs;
    height: 330/@bs;
  }
}
.title{
  text-align: center;
  font-size: 30/@bs;
  line-height: 60/@bs;
}
.listCon{
  border-top: 1/@bs solid #d9d9d9;
}
</style>
