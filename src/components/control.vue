<template>
  <div class="control">
    <image class="control-icon" src="/static/images/icon_sub.png" @click="sub" ></image>
    <span class="control-num">{{goods_number}}</span>
    <image class="control-icon" src="/static/images/icon_plus.png" @click="plus" ></image>
  </div>
</template>

<script>
import {cartEdit} from './api.js'
export default {
  props: {
    id: {
      type: String
    },
    'goods_number': {
      type: Number,
      default: 1
    },
    'remained_number': {
      type: Number,
      default: 0
    }
  },
  methods: {
    sub () {
      if (this.goods_number > 1) {
        if (this.id) {
          cartEdit({
            id: this.id,
            goods_number: this.goods_number - 1
          }).then(res => {
            this.goods_number -= 1
            this.$emit('controlChange', this.goods_number)
          })
        } else {
          this.goods_number -= 1
          this.$emit('controlChange', this.goods_number)
        }
      }
    },
    plus () {
      if (this.remained_number === 0) {
        wx.showToast({
          title: '暂无更多库存',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.goods_number < this.remained_number) {
        if (this.id) {
          cartEdit({
            id: this.id,
            goods_number: parseInt(this.goods_number) + 1
          }).then(res => {
            this.goods_number = parseInt(this.goods_number) + 1
            this.$emit('controlChange', this.goods_number)
          })
        } else {
          this.goods_number = parseInt(this.goods_number) + 1
          this.$emit('controlChange', this.goods_number)
        }
      } else {
        wx.showToast({
          title: '暂无更多库存',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.control{
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 36/@bs;
  &-icon {
    width: 36/@bs;
    height: 36/@bs;
  }
  &-num {
    display: inline-block;
    box-sizing: border-box;
    margin: 0 4/@bs;
    padding: 0 10/@bs;
    min-width: 60/@bs;
    background-color: #E9E9E9;
    text-align: center;
    line-height: 36/@bs;
  }
}
</style>
