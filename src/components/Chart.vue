 
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  data() {
    return {
      options: {
      responsive: true,
      maintainAspectRatio: false
    }
    }
  },
  mixins: [reactiveProp],
  props: ['chartData'],
  options: {
    responsive: false,
    maintainAspectRatio: false
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
