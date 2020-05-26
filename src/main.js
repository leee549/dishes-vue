// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/font/iconfont.css";

import qs from 'qs'
import Axios from "axios";
import './assets/global.css'
import VueParticles from 'vue-particles'
//******************************************
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueParticles)
Vue.prototype.$http = Axios;
Vue.prototype.$qs = qs
//配置请求的根路径
Axios.defaults.baseURL = 'http://localhost:8080/'
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.withCredentials = true;// 允许跨域携带cookie

export function post(url, params) {
  return new Promise((resolve, reject) => {
    Axios.post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

export function put(url, params) {
  return new Promise((resolve, reject) => {
    Axios.put(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function del(url, params) {
  return new Promise((resolve, reject) => {
    Axios.delete(url, {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
