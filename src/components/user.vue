<template>
    <div class="item user">
        <img class="icon" src="../img/01er4r_12.png" alt="">
        <span class="name">{{ userinfo.name }}</span>
    </div>
</template>

<script>
    // 图表组件
    import http from 'service/myHttp'
    import url from 'service/url'
    export default {
        name: 'user',
        props: {},
        data() {
            return {
                name: 'user',
                userinfo:this.$store.state.login_module.userinfo||''
            }
        },
        watch: { //嵌套过深的对象无法监听除非深度监听 耗性能不推荐 不知是否是存在数组的问题 最好发新的整个对象过来
        },
        methods: {
            
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
        width: 1rem;
        vertical-align: middle;
        margin-right: 0.5rem;
    }
    .item .name {
        font-size: 0.7rem;
        color: #fff;
    }
</style>
