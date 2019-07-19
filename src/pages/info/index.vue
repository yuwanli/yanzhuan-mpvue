<template>
    <div class="container no-header">
      <title title="通知"></title>
      <scroll-view class="listCon" scroll-y="true" enable-back-to-top=true  @scrolltolower="loadData(true)">
          <div class="weixin" @click="setContent">
            <h1>联系微信客服</h1>
            <p>yanzhuang9999</p>
          </div>

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
    setContent () {
      wx.setClipboardData({
        data: 'yanzhuang9999',
        success (res) {
          wx.showToast({
            title: '微信号复制成功',
            icon: 'none'
          })
        }
      })
    },
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
      // const handle = () => {
      //   wx.setClipboardData({
      //     data: item.order_sn,
      //     success: () => {
      //       wx.showToast({
      //         title: '单号已复制到剪贴板',
      //         icon: 'none'
      //       })
      //     }
      //   })
      // }
      if (item.read_mark === '1') {
        readMessage(item.id).then(res => {
          item.read_mark = 2
          this.updateUserStatus()
        })
      }
      // else {
      //   handle()
      // }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.weixin{
  width: 640/@bs;
  height: 253/@bs;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('https://image.sono.mobi/yanzhuang/static/images/info-top.png');
  text-align: center;
  h1{
    font-size: 30/@bs;
    line-height: 60/@bs;
    color: #fff;
    font-weight: bold;
  }
  p{
    font-size: 30/@bs;
    color: #6e5cf0;
    line-height: 98/@bs;
  }
}
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h1{
      font-size: 20/@bs;
      line-height: 40/@bs;
      span{
        float: right;
        color: rgba(28,28,28,0.6);
      }
    }
    p{
      width: 100%;
      overflow: hidden;
      color: rgba(38,38,38,0.6);
      text-overflow: ellipsis;
      font-size: 20/@bs;
      line-height: 24/@bs;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
