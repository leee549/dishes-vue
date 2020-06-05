<template>
  <el-container class="aside-container">
    <!--侧边栏-->
    <el-aside :width="isCollapse?'64px':'250px'">
      <!--侧边栏菜单-->
      <!--<el-menu :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"-->
      <!--         unique-opened>-->
      <!--  &lt;!&ndash;一级菜单&ndash;&gt;-->
      <!--  <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">-->
      <!--    <template slot="title">-->
      <!--      <i :class="item.icon"></i>-->
      <!--      <span>{{item.name}}</span>-->
      <!--    </template>-->
      <!--    &lt;!&ndash;二级菜单&ndash;&gt;-->
      <!--    <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.childMenus"-->
      <!--                  :key="subItem.id" >-->
      <!--      <template slot="title">-->
      <!--        <i class="el-icon-menu"></i>-->
      <!--        <span>{{subItem.name}}</span>-->
      <!--      </template>-->
      <!--    </el-menu-item>-->

      <!--  </el-submenu>-->
      <!--  -->
      <!--</el-menu>-->
      <el-menu :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
               unique-opened router :default-active="activePath" @click="saveNavState">
        <!--一级菜单-->
        <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <!--二级菜单,没有字节点-->
          <el-menu-item :index="'/'+subItem.url" v-for="subItem in item.childMenus"
                        :key="subItem.id" v-if="!subItem.childMenus" @click="saveNavState('/'+subItem.url)">
            <template slot="title">
              <i :class="subItem.icon"></i>
              <span>{{subItem.name}}</span>
            </template>
          </el-menu-item>
          <!--二级菜单,有字节点-->
          <el-submenu :index="subItem.id+''" v-for="subItem in item.childMenus"
                      :key="subItem.id" v-if="subItem.childMenus">
            <template slot="title">
              <i :class="subItem.icon"></i>
              <span>{{subItem.name}}</span>
            </template>
            <!--判断是否为三级节点-->
            <el-menu-item-group>
              <el-menu-item :index="'/' + child3.url" v-for="child3 in subItem.childMenus"
                            :key="child3.id" v-if="child3.level='3'" @click="saveNavState(activePath)">
                <i :class="child3.icon"></i>
                {{child3.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>


        </el-submenu>
      </el-menu>

    </el-aside>

    <el-container class="left-container">
      <!--头部-->
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
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
          <el-menu-item class="logout" index="7"><a @click="logout">退了</a></el-menu-item>
          <div class="user-img">
            <img style="border-radius: 100%" src="../assets/canteen.png">
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
        <!--  <el-breadcrumb-item :to="{ path: '/home' }" @click="toIndex">首页</el-breadcrumb-item>-->
        <!--  <el-breadcrumb-item>展示</el-breadcrumb-item>-->
        <!--  &lt;!&ndash;<el-breadcrumb-item>活动列表</el-breadcrumb-item>&ndash;&gt;-->
        <!--  &lt;!&ndash;<el-breadcrumb-item>活动详情</el-breadcrumb-item>&ndash;&gt;-->
        <!--</el-breadcrumb>-->
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
    //name: "menutree",
    data() {
      return {
        isCollapse: false,
        menuList: [],
        //被激活的地址
        activePath:'',

      }
    },
    //components: {
    //  menutree: menutree
    //},
    created() {
      this.getMenuList();
      this.activePath = window.sessionStorage.getItem('activePath')
      //this.test();
    },
    methods: {
      //菜单栏折叠
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;

      },
      //注销
      logout() {
        window.localStorage.clear()
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      //获取菜单列表
      async getMenuList() {
        const {data:res} = await this.$http.get('menus')
          console.log(res);
          if (res.status !== 200) return this.$message.error(res.msg);
          this.menuList = res.data.menu;
          console.log(res.data.menu)
      },
      //保存激活的地址
      saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath = activePath;
      },
      //
      toIndex(){
        //window.sessionStorage.getItem('activePath').clear()
      },
      async test(){
        await this.$http.get('user')
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu {
    border-right: none;
    height: 100%;
  }

  .el-aside {
    /*background-color: #D3DCE6;*/
  }

  .aside-container {
    height: 100%;
  }

  .toggle-button {
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
    outline: none;
  }

  /*.el-avatar{*/
  /*  float: right;*/
  /*  margin: 2px 2px 2px 2px;*/
  /*  outline:none;*/
  /*}*/
  .user-img {
    float: right;
    margin: 2px;
    border-radius: 50%;
    outline: none;
    height: 50px;
    width: 50px;
    float: right;

    > img {
      height: 50px;
      width: 50px;

    }

  }

  .logout {
    float: right;

    > a {
      text-decoration: none;
    }
  }

  .el-main {
    background-color: #EAEDF1;

  }

  .footer {
    font-size: 20px;
    color: #666666;
    transform: translateY(50%);
  }


</style>
