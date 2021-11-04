<template>
  <div id="app">
    <div id="nav">
      <Navbar></Navbar>
    </div>
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/NavBar.vue";
export default {
  name: "App",
  components: { Navbar },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

#nav {
  a {
    font-weight: bold;
    color: #353535;

    &.router-link-exact-active {
      color: #f5f5f5;
    }
  }
}
</style>
