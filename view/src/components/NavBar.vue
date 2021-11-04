<template>
  <div class="NavBar">
    <div id="nav">
      <router-link to="/home">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/todo">Todo</router-link> |
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
<style scoped less>
#nav {
  width: 100vw;
  line-height: 70px;
  background-color: rgb(165, 165, 165);
}
</style>