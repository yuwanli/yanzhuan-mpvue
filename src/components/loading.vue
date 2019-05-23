<template>
  <div class="loading" v-show="hasMore">
    <div v-show="hasMore" class="load-spinner"></div>
    <p>{{hasMore ? loadingText : noMoreText}}</p>
  </div>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: '加载中...'
    },
    noMoreText: {
      type: String,
      default: '无更多内容'
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  }
}
</script>



<style lang="less" scoped>
@import '~src/utils/less/var.less';
.loading{
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 640/@bs;
  height: 80/@bs;
  p{
    color: #c5c5c5;
    font-size: 24/@bs;
  }
}
.load-spinner{
    margin-right: 15/@bs;
    width: 30/@bs;
    height: 30/@bs;
    border: 5/@bs solid transparent;
    border-top-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-radius: 50%;
    animation: loading .8s infinite linear;
}
@keyframes loading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}
</style>
