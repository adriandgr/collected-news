import { HorizontalBar } from 'vue-chartjs'

export default HorizontalBar.extend({
  props: ['dataSet'],
  mounted () {
    const keywords = this.dataSet.map(pairs => { return pairs.keyword });
    const frequencies = this.dataSet.map(pairs => { return pairs.frequency });
    this.renderChart({
      labels: keywords,
      datasets: [
        {
          backgroundColor: '#393E46',
          data: frequencies
        }
      ]
    }, {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          yAxes: [{
            gridLines : {
                drawBorder : false
            },
            scaleLabel: {
              display: true,
              labelString: 'keywords'
            }
          }],
          xAxes: [{
            gridLines : {
                drawBorder : false
            },
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
