<template>
    <div class="item loginout" @click="logout">
        <img class="icon" src="../img/user.png" alt="">
        <span class="name">退出</span>
    </div>
</template>

<script>
    // 图表组件
    import http from 'service/myHttp'
    import url from 'service/url'
    export default {
        name: 'loginout',
        props: {},
        data() {
            return {
                name: 'loginout',
            }
        },
        watch: { //嵌套过深的对象无法监听除非深度监听 耗性能不推荐 不知是否是存在数组的问题 最好发新的整个对象过来
        },
        methods: {
            logout: function() {
                //登出
                // http.post(url.LOGOUT).then(res => {
                //     this.$store.commit('setuserinfo', null) //退出清空用户信息
                //     this.$router.push('/login')
                // })
            }
        },
        // computed:{
        // },
        mounted() {
            //组件挂载后
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .item {
        height: 100%;
        margin: 0rem 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .item .icon {
        width: 0.6rem;
        vertical-align: middle;
        margin-right: 0.2rem;
    }
    .item .name {
        font-size: 0.7rem;
        color: #fff;
    }
</style>
