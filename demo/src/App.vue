<template>
  <div id="app">
    <div>
      <a href="/"  >主页</a>
      <a href="#" @click="link" >线连接</a>
      <a href="#"  @click="noScale">选择框</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    link(){
      this.$router.push('/link')
    },
    noScale(){
      this.$router.push('/noscale')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
