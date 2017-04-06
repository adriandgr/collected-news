import { HorizontalBar } from 'vue-chartjs'

export default HorizontalBar.extend({
  props: ['dataSet'],
  mounted () {
    const keywords = this.dataSet.map(pairs => { return pairs.keyword });
    const rels = this.dataSet.map(pairs => { return pairs.rel });
    this.renderChart({
      labels: keywords,
      datasets: [
        {
          backgroundColor: '#393E46',
          data: rels
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
