import { HorizontalBar } from 'vue-chartjs'

export default HorizontalBar.extend({
  props: ['data'],
  mounted () {
    const keywords = this.data.map(pairs => { return pairs.keyword });
    const frequencies = this.data.map(pairs => { return pairs.frequency });
    this.renderChart({
      labels: keywords,
      datasets: [
        {
          backgroundColor: '#EEEE',
          data: frequencies
        }
      ]
    }, {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'keywords'
            }
          }],
          xAxes: [{
              categoryPercentage: 0.95,
              barPercentage: 0.95,
              ticks: { display: false },
              scaleLabel: {
                display: true,
                labelString: 'popularity'
              }
          }]
        }
       })
  }
})
