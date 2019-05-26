<template>
    <div class="container no-header">
      <title title="通知"></title>
      <scroll-view class="listCon" scroll-y="true" enable-back-to-top=true  @scrolltolower="loadData(true)">
          <div class="item" v-for="(item,index) in list" :key="item.id" @click="readMessage(item,index)" >
            <div class="item-icon">
              <image src="/static/images/icon_logistics.png"></image>
              <div class="item-icon-label" v-if="item.read_mark=='1'">1</div>
            </div>
            <div class="item-desc">
              <h1>
                {{type[item.type-1]}}<span>{{item.timeStr}}</span>
              </h1>
              <p>{{item.content}}</p>
            </div>
          </div>
      </scroll-view>
    </div>
</template>

<script>
import {getMessageList, readMessage} from './api'
import {base} from 'src/mixins/base.js'
import title from 'src/components/title.vue'
export default {
  data () {
    return {
      list: [],
      type: ['物流通知', '物流通知', '试用通知'],
      page: 1,
      pageNum: 10,
      hasMore: true,
      loading: false,
      initFlag: false
    }
  },
  mixins: [base],
  components: {
    title
  },
  computed: {
  },
  onLoad () {
    this.loadData(false)
  },
  methods: {
    formatDate (s) {
      let date = new Date(s * 1000)
      let y = date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear()
      let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return y + '-' + m + '-' + d + '  ' + h + ':' + min
    },
    loadData (hideLoading) {
      if (!this.hasMore || this.loading) {
        return
      }
      this.loading = true
      getMessageList(
        {
          page: this.page,
          num: this.pageNum
        },
        hideLoading
      ).then((data) => {
        this.loading = false
        this.page += 1
        data = data.map(val => {
          val.timeStr = this.formatDate(val.create_time)
          return val
        })
        this.list = this.list.concat(data)
        this.hasMore = (data.length >= this.pageNum)
        !this.initFlag && (this.initFlag = true)
      }).catch(() => {
        this.loading = false
      })
    },
    readMessage (item) {
      const handle = () => {
        wx.setClipboardData({
          data: item.order_sn,
          success: () => {
            wx.showToast({
              title: '单号已复制到剪贴板',
              icon: 'none'
            })
          }
        })
      }
      if (item.read_mark === '1') {
        readMessage(item.id).then(res => {
          item.read_mark = 2
          this.updateUserStatus()
        })
      } else {
        handle()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.item{
  display: flex;
  justify-content: space-between;
  margin: 0 30/@bs;
  padding: 30/@bs 0 20/@bs;
  height: 90/@bs;
  border-bottom: 1/@bs solid #aaa;
  &-icon{
    position: relative;
    flex:  0 0 90/@bs;
    margin-right: 30/@bs;
    width: 90/@bs;
    height: 90/@bs;
    background-color: #84bb44;
    image{
      width: 90/@bs;
      height: 90/@bs;
    }
    &-label{
      position: absolute;
      top:-10/@bs;
      right: -10/@bs;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 28/@bs;
      height: 28/@bs;
      border: 1/@bs solid #fff;
      border-radius: 50%;
      background-color: #806ffd;
      color: #fff;
      text-align: center;
      font-size: 20/@bs;
    }
  }
  &-desc{
    overflow: hidden;
    flex: 1;
    h1{
      font-size: 20/@bs;
      line-height: 40/@bs;
      span{
        float: right;
        color: rgba(28,28,28,0.6);
      }
    }
    p{
      overflow: hidden;
      color: rgba(38,38,38,0.6);
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 20/@bs;
      line-height: 40/@bs;
    }
  }
}
</style>
