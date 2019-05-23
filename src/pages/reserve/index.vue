<template>
  <div class="container">
    <sono-header></sono-header>
    <div class="baseInfo">
      <h1>{{data.title}}</h1>
      <p>{{data.price}}元</p>
    </div>
    <div class="form">
      <h1>到货通知我</h1>
      <div class="form_item">
        <div class="form_item-name">姓名</div>
        <input adjust-position=true auto-focus v-model="formData.content_name" placeholder-style="color: #6b6d6f" class="form_item-input" type="text" placeholder="请填写姓名">
      </div>
      <div class="tips"><span></span>手机和邮箱，可任选其一</div>
      <div class="form_item">
        <div class="form_item-name">手机</div>
        <input adjust-position=true v-model="formData.content_mobile" placeholder-style="color: #6b6d6f" class="form_item-input" type="number" placeholder="请填写你的手机号">
      </div>
      <div class="form_item">
        <div class="form_item-name">邮箱</div>
        <input adjust-position=true v-model="formData.content_email" placeholder-style="color: #6b6d6f" class="form_item-input" type="text" placeholder="请填写邮箱">
      </div>
      <div class="form_item">
        <div class="form_item-name">微信</div>
        <input adjust-position=true v-model="formData.content_wechat" placeholder-style="color: #6b6d6f" class="form_item-input" type="text" placeholder="请填写你的微信号">
      </div>
      <div class="text_area">
        <div class="text_area-name">其他需求</div>
        <textarea v-model="formData.content_info" adjust-position=true placeholder-style="color: #6b6d6f" class="text_area-input" placeholder="请填写其他需求" />
      </div>
      <div @click="submitData" :class="['form_submit',btnStatus ? 'active': '']">提交我的预定</div>
    </div>

    <div class="content">
      <wxParse :content="data.content" />
    </div>
  </div>
</template>

<script>
import {getDetail, reserveAdd} from './api'
import header from 'src/components/header.vue'
import {base} from 'src/mixins/base.js'
import wxParse from 'mpvue-wxparse'
const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/
const phoneReg = /^(\d{3,4}-\d{7,8}-\d{1,6})|(\d{3,4}-\d{7,8})|(\d{15,16})|(\d{13,14})|(\d{11,12})$/
export default {
  data () {
    return {
      data: {
      },
      formData: {
        content_name: '',
        content_mobile: '',
        content_email: '',
        content_wechat: '',
        content_info: ''
      },
      errorMsg: ''
    }
  },
  computed: {
    btnStatus () {
      if (!this.formData.content_name) {
        this.errorMsg = '请填写你的姓名'
        return false
      } else if (!this.formData.content_mobile && !this.formData.content_email) {
        this.errorMsg = '为了能第一时间通知你，请填写手机号或邮箱'
        return false
      } else if (this.formData.content_mobile && !phoneReg.test(this.formData.content_mobile)) {
        this.errorMsg = '手机号格式有误，请正确填写'
        return false
      } else if (this.formData.content_email && !emailReg.test(this.formData.content_email)) {
        this.errorMsg = '邮箱格式有误，请正确填写'
        return false
      } else if (!this.formData.content_wechat) {
        this.errorMsg = '请填写你的微信号'
        return false
      }
      return true
    }
  },
  components: {
    'sono-header': header,
    wxParse
  },
  mixins: [base],
  onLoad () {
    getDetail(this.$root.$mp.query.id).then(res => {
      this.data = res
    })
  },
  methods: {
    submitData () {
      if (!this.btnStatus) {
        wx.showToast({
          title: this.errorMsg,
          icon: 'none'
        })
        return
      }
      reserveAdd({
        ...this.formData,
        good_id: this.data.good_id
      }).then(res => {
        wx.showModal({
          'title': '提交成功',
          'content': '到货我们将第一时间通知您！',
          showCancel: false,
          confirmText: '回首页',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: `/pages/index/main`
              })
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
@import url("~mpvue-wxparse/src/wxParse.css");
.container{
  padding-bottom: 80/@bs;
  background-color: @grayBg;
}
.content{
  background-color: #fff;
}

.form{
  margin: 10/@bs 0;
  padding: 30/@bs;
  background-color: #fff;
  text-align: center;
  h1{
    margin-bottom: 30/@bs;
    font-weight: bold;
    font-size: 30/@bs;
  }
  .tips{
    color: #b4282d;
    font-size: 20/@bs;
    text-align: center;
    line-height: 30/@bs;
    margin-top: 30/@bs;
    margin-bottom: 10/@bs;
    height: 30/@bs;
    span{
      display: inline-block;
      vertical-align: top;
      width: 10/@bs;
      height: 10/@bs;
      border-radius: 50%;
      margin-top: 10/@bs;
      margin-right: 10/@bs;
      background-color: #b4282d;
    }
  }
  &_item{
    display: flex;
    align-items: center;
    margin: 0 30/@bs 15/@bs;
    padding: 0 10/@bs;
    height: 60/@bs;
    border-bottom: 1/@bs solid #aaaaaa;
    color: #1c1c1c;
    font-size: 24/@bs;
    &-name{
      flex:  0 0 110/@bs;
      width: 110/@bs;
      text-align: left;
    }
    &-input{
      flex: 1;
      text-align: left;
    }
  }
  &_submit{
    display: block;
    margin: 30/@bs auto 0;
    width: 380/@bs;
    height: 50/@bs;
    border-radius: 20/@bs;
    background-color: #f09da1;
    color: #fff;
    text-align: center;
    font-size: 24/@bs;
    line-height: 50/@bs;
    transition: all 0.3s ease;
    &.active{
      background-color: #ff434c;
    }
  }
}
.text_area{
  margin: 0 30/@bs;
  text-align: left;

  &-name{
    color: #1c1c1c;
    font-size: 24/@bs;
    line-height: 60/@bs;
  }
  &-input{
    box-sizing: border-box;
    padding: 10/@bs;
    width: 100%;
    height: 220/@bs;
    border: 1/@bs solid #aaaaaa;
    color: #1c1c1c;
    font-size: 24/@bs;
  }
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
