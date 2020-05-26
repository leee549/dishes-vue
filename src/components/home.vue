<template>
  <el-container class="aside-container">
    <!--侧边栏-->
    <el-aside :width="isCollapse?'64px':'250px'" >
      <el-menu :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
               unique-opened>
        <el-submenu index="1" >
          <!--一级菜单-->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <!--二级菜单-->
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-submenu>



      </el-menu>
    </el-aside>
    <el-container class="left-container">
      <!--头部-->
      <el-header>
        <el-menu  class="el-menu-demo" mode="horizontal" >
          <div class="toggle-button" @click="toggleCollapse">
            <i class="el-icon-s-fold"></i>
          </div>
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4">订单管理</el-menu-item>
          <!--<el-avatar :size="50" src="../assets/canteen.png"></el-avatar>-->
          <el-menu-item class="logout" index="7"><a href="#">退了</a></el-menu-item>
          <div class="user-img">
          <img style="border-radius: 100%" src="../assets/canteen.png">
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>展示</el-breadcrumb-item>
          <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
        </el-breadcrumb>
      </el-main>
      <el-footer>
        <div class="footer">
        © 2019-2020
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      data() {
        return {
          isCollapse:false,
        }
      },
      methods:{
        toggleCollapse(){
          this.isCollapse=!this.isCollapse;

        }
      }
    }
</script>

<style lang="less" scoped>
  .el-menu{
    border-right: none;
    height: 100%;
  }
  .el-aside{
    /*background-color: #D3DCE6;*/
  }
  .aside-container{
    height: 100%;
  }
  .toggle-button{
    float: left;
    height: 60px;
    width: 60px;
    line-height: 60px;
    border-bottom: 2px solid transparent;
    color: #909399;
    //点击的手指
    cursor: pointer;
    text-align: center;
    //点击的边框取消
    outline:none;
  }
  /*.el-avatar{*/
  /*  float: right;*/
  /*  margin: 2px 2px 2px 2px;*/
  /*  outline:none;*/
  /*}*/
  .user-img{
    float: right;
    margin: 2px;
    border-radius: 50%;
    outline:none;
    height: 50px;
    width: 50px;
    float: right;
    >img{
      height: 50px;
      width: 50px;

    }

  }
  .logout{
    float: right ;
    >a{
      text-decoration: none;
    }
  }
  .el-main{
    background-color: #EAEDF1;

  }
  .footer{
    font-size: 20px;
    color: #666666;
    transform: translateY(50%);
  }



</style>
