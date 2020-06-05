<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="block">
      <span class="demonstration">默认 Hover 指示器触发</span>
      <el-carousel height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  <!--<el-card class="box-card">-->

  <!--  &lt;!&ndash;<div slot="header" class="">&ndash;&gt;-->
  <!--  &lt;!&ndash;  <div>asdasd</div>&ndash;&gt;-->
  <!--  &lt;!&ndash;  <span>卡片名称</span>&ndash;&gt;-->
  <!--  &lt;!&ndash;  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>&ndash;&gt;-->
  <!--  &lt;!&ndash;</div>&ndash;&gt;-->
  <!--</el-card>-->
  </div>

</template>

<script>
    export default {
    }
</script>

<style scoped lang="less">

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
