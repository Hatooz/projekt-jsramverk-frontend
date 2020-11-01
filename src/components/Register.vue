<template>
    <div>
        <div v-if="!registered">
        <form class="post-form" v-on:submit.prevent action="" method="post">
            <h1>Register</h1>
            <div class="main-form">    
            <label for="email">Email</label>
            <input type="text" v-model="email" id="email"> 
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password">
            <p></p>
            <input class="submit-button" type="button" value="submit" @click="registerUser()">
            </div>
        </form>
        </div>
        <div class="post-form " v-if="registered">
            <h1>Registration complete!</h1> 
            <h2>Click <router-link to="/login">here</router-link> to login</h2>

        </div>
    </div>
</template>

<script>
import requestService from '../requestService'
export default {
    data() {
        return {
            email: '',
            password: '',
            registered: false
        }
    },
    methods: {
      async registerUser() {
          this.success = await requestService.registerUser(this.email, this.password)
          this.registered = true;
          
      }
  },
}
</script>

<style>
.post-form {
    margin-top: 50px;
}
</style>
