<template>
  <div class="top">
    <nav >    
     <router-link v-if="!logged" to="/register">Register</router-link>
     <router-link v-if="!logged" to="/login">Login</router-link>
      <a href="" @click="logout()" v-if="logged">Logout</a>
     <router-link v-if="logged"  to="/dashboard">Dashboard</router-link>
    </nav>
    <p class="title">Real Money Trading</p>
  </div>
</template>

<script>
import { bus } from '../main'
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data() {
    return {
      logged: false
    }
  },
  methods: {
    checkUser: function() {
      this.logged = localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null
    },
    logout: function() {
      localStorage.removeItem('user')
    }
  },
  created() {
    this.logged = localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null
    bus.$on('loggedIn', (data) => {
      this.logged = data
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  position: fixed;
  top: 0;
  width: 100%;
  margin-left: -10px;
  text-align: left;  
  background-color: indigo;
  height: 90px;
  color: white;  
}
.top a {
  float: right;
  color: white;
  font-size: 2rem;
  margin-top: 30px;
  margin-right: 20px;
}

.title {
  font-size: 2rem;
  margin-top: 30px;
  margin-left: 10px;
  font-weight: bold;
}
</style>
