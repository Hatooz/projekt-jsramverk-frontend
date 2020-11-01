<template>
<div>
    <div v-if="checkUser()">
        <h1>Dashboard for {{user}}</h1>         
        <h2>Money in wallet: {{money}} $</h2>
        <p class="bold">Add to wallet <span><input type="text" v-model="addMoney" name="money" id="money"></span><input class="add-money" type="submit" value="Add" @click="addToWallet()"></p>
        <div class="container">
            <div class="stocks">
                
                <p class="bold">Currenlty owned Chaos orbs {{chaos}}</p>
                <chart-container-chaos/>
                <button class="nice-button chaos" @click="buy('chaos', 1, 'buy')">Buy Chaos</button>
                <button class="nice-button chaos" @click="buy('chaos', -1, 'sell')">Sell Chaos</button>
            </div>
            <div class="stocks">
                <p class="bold">Currenlty owned Exalted orbs {{exalts}}</p>
                <chart-container-exalt/>
                <button class="nice-button" @click="buy('exalts', 1, 'buy')">Buy Exalted</button>
                <button class="nice-button" @click="buy('exalts', -1, 'sell')">Sell Exalted</button>                
            </div>
            
            
        </div>
        
    </div>
    <div class="no-user" v-if="!checkUser()">
        <h1>Welcome to Real Money Trading!</h1>
        <h3>The best place to get your Path Of Exile in game currency for your hard earned real life cash!</h3>
        <h2>Please login to start trading</h2>
        <h2>$$$</h2>
        <h2>£££</h2>
        <h2>€€€</h2>
    </div>
</div>
    
</template>

<script>
import requestService from '../requestService'
import ChartContainerChaos from './ChartContainer'
import ChartContainerExalt from './ChartContainerExalt'
import io from "socket.io-client"


export default {
    components: {
        ChartContainerChaos,
        ChartContainerExalt
    },
   data() {
       return {
           stocks: '',
           user: '',
           chaos: '',
           exalts: '',
           money: '',
           chaosPrice: 0,
           exaltPrice: 0,
           addMoney: 0
       }
   },
   methods: {
        buy: function(stock, amount, intent) {           
            if (stock === 'chaos') {                
                if (intent === 'buy') {
                    requestService.buyStock(stock, this.chaosPrice, amount, this.user)
                } else if (intent === 'sell') {
                    if (this.chaos <= 0) {
                        return
                    }
                    requestService.buyStock(stock, -this.chaosPrice, amount, this.user)
                }                
                requestService.getDashboard(this.user).then(data => {
                    this.chaos = data.chaos;
                    this.money = data.assets.toFixed(2);
                })
            } else if (stock === 'exalts') {                
                if (intent === 'buy') {
                    requestService.buyStock(stock, this.exaltPrice, amount, this.user)
                } else if (intent === 'sell') {
                    if (this.exalts <= 0) {
                        return
                    }
                    requestService.buyStock(stock, -this.exaltPrice, amount, this.user)
                }
                requestService.getDashboard(this.user).then(data => {
                    this.exalts = data.exalts;
                    this.money = data.assets.toFixed(2);
                })
            }
        },
        addToWallet: function() {
            requestService.insertMoney(this.addMoney, this.user);
            requestService.getDashboard(this.user).then(data => {
                this.money = data.assets.toFixed(2);
            })
        },
        checkUser: function() {
            return localStorage.getItem('user') != 'undefined' && localStorage.getItem('user') != null
        }
    },
    created() {
        this.user = this.$route.params.email
        if (localStorage.getItem('user') == "undefined" || (localStorage.getItem('user') !== this.$route.params.email && this.$route.params.email !== undefined)) {
           localStorage.setItem('user', this.$route.params.email)
        }
       requestService.getDashboard(localStorage.getItem('user')).then(info => {
        console.log(info)
        this.chaos = info.chaos;
        this.exalts = info.exalts;
        this.money = info.assets.toFixed(2);
        })
       this.socket = io("http://localhost:3000")      
    },
    mounted() {
        this.socket.on("connect", function() {
            console.log("connected!") 
        }),
        
        this.socket.on("ching", data => {        
            this.chaosPrice = data[0].datasets[0].data[data[0].datasets[0].data.length - 1]
            this.exaltPrice = data[1].datasets[0].data[data[1].datasets[0].data.length - 1]
        })        
        this.user = localStorage.getItem('user')
    },
 

}
</script>

<style>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
}

.stocks {
    width: 100%;
    margin-left: 200px;    
}

.bold {
    font-weight: bold;
}

.nice-button {
    margin: 5px;
    padding: 5px;
    margin-top: 20px;
    margin-left: 40px;
    border: none;
    background-color: #d4af37;
    color: white;
    width: 100px;
    height: 50px;
    border-radius: 10px;
}

.chaos {
    background-color: indigo;
}

.add-money {
    margin: 5px;
    padding: 5px;
    margin-top: 20px;
    margin-left: 10px;
    border: none;
    background-color: indigo;
    color: white;
    width: 100px;    
    border-radius: 10px;
}

.no-user {
    width: 50%;
    margin: auto;
    border: 1px solid black;
    text-align: center;
    color: indigo;
}
</style>
