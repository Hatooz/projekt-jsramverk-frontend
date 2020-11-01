<template>
  <div id="app">
    
    <navbar/>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
.main {
  margin-top: 100px;
}

</style>
