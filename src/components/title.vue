<template>
  <div class="title">
    {{title}}
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.title {
  margin-bottom: 15/@bs;
  height: 50/@bs;
  background-color: #ebebeb;
  color:#333;
  text-align: center;
  font-size: 24/@bs;
  line-height: 50/@bs;
}
</style>
