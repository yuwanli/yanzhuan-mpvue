<template>
  <div class="container">
    <sono-header></sono-header>
    <scroll-view class="listCon" scroll-y="true" enable-back-to-top=true  @scrolltolower="loadData(true)">
        <item v-for="item in list" v-bind:key="item.id" :item='item'></item>
        <sono-loading v-show="initFlag" :hasMore="hasMore"></sono-loading>
    </scroll-view>
  </div>
</template>

<script>
import {getIndexList} from './api'
import item from 'src/components/item.vue'
import header from 'src/components/header.vue'
import loading from 'src/components/loading.vue'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      list: [],
      page: 1,
      pageNum: 10,
      hasMore: true,
      loading: false,
      initFlag: false
    }
  },
  mixins: [base],
  components: {
    item,
    'sono-header': header,
    'sono-loading': loading
  },
  computed: {
  },
  onLoad () {
    this.loadData(false)
  },
  methods: {
    orderList () {
      wx.navigateTo({
        url: '/pages/order_list/main'
      })
    },
    loadData (hideLoading) {
      if (!this.hasMore || this.loading) {
        return
      }
      this.loading = true
      getIndexList(
        {
          page: this.page,
          num: this.pageNum
        },
        hideLoading
      ).then((res) => {
        this.loading = false
        this.page += 1
        this.list = this.list.concat(res.list)
        this.hasMore = (res.list.length >= this.pageNum)
        !this.initFlag && (this.initFlag = true)
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.listCon{
  position: fixed;
  top: 100/@bs;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: 1/@bs solid #d9d9d9;
}
</style>
