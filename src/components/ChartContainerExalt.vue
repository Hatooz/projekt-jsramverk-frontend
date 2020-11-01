<template>
  <div class="container">
    <line-chart
      
      :chartData="chartData"
      :options="options"/>
      
  </div>
</template>

<script>
import LineChart from './ChartExalt.vue'
import io from "socket.io-client"

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: function(){
      return{        
        loaded: true,
        chartData: {
        labels: [0, 5],
        datasets: [
            {
            label: 'Exalted orbs',
            backgroundColor: '#d4af37',
            data: [2, 3]
            }
        ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
      }
   
  },
  methods: {
      simulate(){
          this.chartData = this.tempData[0];
                    
        //   console.log(this.chartData.labels)
        //   console.log(this.chartdata.datasets[0].data)
      }
  },
//   watch: {
//       tempData: function() {
//           this.chartData = this.tempData;
//       }
//   },
  created: function() {
    console.log("Starting connection to websocket Server")
    this.socket = io("http://localhost:3000")
  },
   mounted() {   
    this.socket.on("connect", function() {
      console.log("connected!") 
    }),
    this.socket.on("ching", data => {
        this.chartData = data[1];
    })
    },
}
 

</script>
