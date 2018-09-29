// 根路由配置
import url from 'service/url'
import http from 'service/myhttp'
import { Message } from 'element-ui';
import VueRouter from 'vue-router' // vue路由
import Cookies from 'js-cookie'
import { home_route } from './home_route'
import { statistics_route } from './statistics_route'


const routes = [
    home_route,
    statistics_route,
    { path: '*', redirect: '/home' }
]

const router_config = { //路由配总配置
    // mode: 'history', //h5路由模式
    routes: routes //路由地址配置数组
}

const router = new VueRouter(router_config)
    // router.beforeEach((to, from, next) => {
    //     //全局守卫
    //     // console.info('地址', to)
    //     let islogin = Cookies.get('useease_project_show_islogin') //判断是否已经登录
    //     let store = router.app.$store //vuex 状态管理store
    //     let userinfo = store.state.login_module.userinfo
    //     if (to.path != '/login') {
    //         //登录页不用判断用户信息 其他要
    //         if (islogin != '1') {
    //             Message({
    //                 message: '请登录',
    //                 type: 'error',
    //                 showClose: true
    //             })
    //             router.push('/login')
    //         } else if (userinfo != null) {

//             next()


//         } else {
//             http.get(url.GETLOGINUSER).then(res => {
//                 let data = res.data
//                 if (data.status != 'err') {
//                     //登录判断码
//                     userinfo = data.info.userinfo
//                     store.commit('setuserinfo', userinfo)
//                     store.commit('setsysinfo', data.info.sysinfo)
//                     next()

//                 } else {
//                     Message({
//                         message: '请登录',
//                         type: 'error',
//                         showClose: true
//                     })
//                     router.push('/login')
//                         // next()
//                 }

//             }, err => {
//                 Message({
//                     message: '请检查网络',
//                     type: 'error',
//                     showClose: true
//                 })
//                 router.push('/login')
//                     // next()
//             })


//         }
//     } else {
//         //登录页只判断是否已登录
//         // Cookies.set('a', 1)
//         //console.info('islogin', islogin)
//         if (islogin == '1') {
//             //登录了
//             Message({
//                 message: '您已登录',
//                 type: 'info',
//                 showClose: true
//             })
//             router.push('/home')
//         } else {
//             next()
//         }

//     }



// })

export { router }