//const login_view = resolve => require(['view/login.vue'], resolve) //组件异步懒加载写法


import home_view from 'view/home'

export const home_route = {
    path: '/home',
    component: home_view,

}