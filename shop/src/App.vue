<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
  export default {
      name: 'app',
       provide() {
           return {
               reload: this.reload,
           };
       },

      data() {
          return {
              isRouterAlive: true,
          };
      },

      methods: {
          reload() {
              this.isRouterAlive = false;
              this.$nextTick(() => {
                  this.isRouterAlive = true;
              });
          }
      }
  }
</script>

<style>
  * {
    /*background-color: #f5f5f5;*/
    padding: 0;
    margin: 0;
  }

  .link {
    color: black;
    text-decoration: none;
  }

  .link2 {
    color: white;
    background-color: #66b1ff;
    text-decoration: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #500003;
  }

  #nav a.router-link-exact-active {
    color: red;
  }
</style>