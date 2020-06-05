import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import home from "../components/home";
import welcome from "../components/welcome";
Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/',redirect:'/login'},
    {path: '/login',  component: login},
    {path:'/home',component:home,redirect:"/welcome",children:[
        {path:'/welcome',component:welcome},

      ]}

  ]
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to:访问的路径
  //from：从那个路径跳转而来
  //next 是一个函数 表示放行
  //next（）放行 next（'/login'）强制跳转
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.localStorage.getItem("token")
  if (!tokenStr) return next('/login');
  next()
})
export default router
