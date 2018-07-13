// 登录模块
export const login_module = {
    state: {
        userinfo: null,
        sysinfo: null
    },
    mutations: {
        setuserinfo(state, val) {
            //设置用户信息
            state.userinfo = val
        },
        setsysinfo(state, val) {
            //设置用户信息
            state.sysinfo = val
        },
    },
    getters: {},
    actions: {}
}