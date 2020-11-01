import axios from 'axios';

const url = 'http://localhost:1337/'
// const url = 'https://me-api.elbizza.me/'

class infoService {
    static async getInfo() {        
            try {
                const res =  await axios.get(url);
                const data = await res.data;
                
                return data;
            } catch (error) {
                console.log(error.message)
            }        
    }

    static async registerUser(email, password) {
        return axios.post(`${url}register`, {
            email,
            password
        }).then(response => {
            console.log(response)
            return response.status
        })
    }
    static async getDashboard(email) {
        return axios.post(`${url}dashboard`, {
            email            
        }).then(response => {
            console.log(response)
            return response.data
        })
    }
    static async buyStock(stock, price, amount, email) {
        return axios.post(`${url}dashboard/buy`, {
            stock,
            price,
            amount,
            email
        }).then(response => {
            console.log(response)
            return response.data
        })
    }
    static async insertMoney(amount, email) {
        return axios.post(`${url}dashboard/insertmoney`, {           
            amount,
            email
        }).then(response => {
            console.log(response)
            return response.data
        })
    }
    static async loginUser(email, password) {
        return axios.post(`${url}login`, {
            email,
            password
        }).then(response => {
            localStorage.setItem('token', response.data.token)
            console.log(response)
            return response.status
        })
    }
    static async getWeekInfo(weekNumber) {
        const access_token = localStorage.getItem('token')
        try {
            const res =  await axios.get(`${url}reports/week/${weekNumber}`, {
                headers: {
                  'x-access-token': `${access_token}`
                }
            });
            const data = await res.data;
            console.log(data)
            
            return data;
        } catch (error) {
            console.log(error.message)
        }    
    }
    static async postRedovisning(kmom, redovisning) {
        const access_token = localStorage.getItem('token')
        console.log(access_token)
        return axios.post(`${url}reports`, {
            kmom,
            redovisning
        }, {
            headers: {
                'x-access-token': `${access_token}`
              }
        }).then(response => {
            return response.data
        }) 
    }
    static async editRedovisning(kmom, redovisning) {
        const access_token = localStorage.getItem('token')
        return axios.put(`${url}reports`, {
            kmom,
            redovisning
        }, {
            headers: {
                'x-access-token': `${access_token}`
              }
        }).then(response => {
            return response.data
        }) 
    }

}
export default infoService;
