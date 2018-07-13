// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' //pc组件
// import 'element-ui/lib/theme-chalk/index.css'; //pc组件样式 
import './css/elementReset.scss'; //ui自定义
// import VueResoure from 'vue-resource' //vue ajax请求库
import Vuex from 'vuex' // vue 模块管理
// import VueTouch from 'vue-touch' //手势库

import VueRouter from 'vue-router' // vue路由
import * as modules from 'modules' // 所有模块
import { router } from 'routers' //路由配置生成对象
import App from './App'
import { HOST } from 'service/HOST'

Vue.use(ElementUI)
    // Vue.use(VueResoure)
Vue.use(Vuex)
Vue.use(VueRouter)
    // VueTouch.config.swipe = {
    //     threshold: 5
    // }
    // Vue.use(VueTouch, { name: 'v-touch' })


// console.log(MintUi)
// console.log(modules)
// console.log(router_config)
/* eslint-disable no-new */
const store = new Vuex.Store({ // vuex状态管理
    state: { //根状态机
        HOST: HOST //服务器地址
    },
    modules: modules //状态机模块
})



new Vue({
    router,
    store,
    el: '#app',
    template: '<App/>',
    components: { App }
})