<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  * {
    background-color: #f5f5f5;
    padding: 0;
    margin: 0;
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
