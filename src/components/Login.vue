<template>
    <div>
       
        <form class="post-form" action="" method="post">
            <h1>Login</h1>
            <div class="main-form">            
            <label for="email">Email</label>
            <input type="text" v-model="email" id="email"> 
            <label for="password">Password</label>
            <input type="text" v-model="password" id="password">
            
            <p></p>
            <input class="submit-button" type="button" value="submit" @click="loginUser()">
            <p></p><span class="incorrect" v-if="incorrect">Email or password incorrect</span>
            
            </div>
        </form>
        
               
    </div>
</template>

<script>
import requestService from '../requestService'
import { bus } from '../main'
export default {
    data() {
        return {
            email: '',
            password:'',
            success: '',
            incorrect: false
        }
    },
    methods: {
        loginUser() {
            
            requestService.loginUser(this.email, this.password).then(data => {
                if (data === 200) {
                   bus.$emit('loggedIn', true)
                    this.incorrect = false;
                    console.log("yaaaaaaay")
                    this.$router.push({name: 'Userdashboard', params: {email: this.email}})
                    
                } else {
                    this.incorrect = true;
                }
            })
           
        }
    },
}
</script>

<style>
.post-form {     
    max-width: 20%;
    margin: auto;
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    color: indigo; 
 
    padding: 20px;
   
}
.main-form {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

input {
 
   
    margin: 10px;
    border-radius: 5px;
    border-color: indigo;
}
label {
 
    margin: 10px;
}

.submit-button {    
    padding: 5px;   
    border: none;
    background-color: indigo;
    color: white;
    border-radius: 10px;
}

.incorrect {
    color: red;
}
</style>
