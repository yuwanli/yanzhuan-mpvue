<template>
  <div class="item" @click="itemClick(item.id)">
    <img mode="aspectFill" class="item-img" :src="item.image" alt="">
    <p class="item-name">{{item.title || 'sono'}}</p>
    <p class="item-price">¥ {{item.price || '0.00'}}</p>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    itemClick (id) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.item{
  display: flex;
  float: left;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 30/@bs;
  width: 320/@bs;
  height: 368/@bs;
  border-bottom: 1/@bs solid #d9d9d9;
  text-align: center;
  font-size: 24/@bs;
  &:nth-child(2n-1){
    border-right: 1/@bs solid #d9d9d9;
  }
  &-img{
    align-items: center;
    margin: 0 auto;
    width: 230/@bs;
    height: 230/@bs;
    background-color: #e8e8e8;
    background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
    background-position: center;
    background-size: 230/@bs 230/@bs;
  }
  &-name{
    overflow: hidden;
    margin-top: 12/@bs;
    padding: 0 20/@bs;
    color: @blackColor;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 36/@bs;
  }
  &-price{
    color: @darkRed;
  }

}
</style>
