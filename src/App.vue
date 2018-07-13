<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import init from 'service/initialize'
  export default {
    name: 'app',
    mounted() {
      init()
    }
  }
</script>

<style>
@import url('./css/style-index.css');
 
  html {
    /* fonsize预设分辨率为1366 20px */
    font-size: 20px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    /* font-size: 10px; */
    /* background-color: #fff; */
    /* margin-top: 60px; */
  }
</style>
