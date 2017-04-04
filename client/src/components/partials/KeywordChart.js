import { HorizontalBar } from 'vue-chartjs'

export default HorizontalBar.extend({
  props: ['data'],
  mounted () {
    console.log('chart');
    console.log(this.data);
    const keywords = this.data.map(pairs => { return pairs.keyword });
    const frequencies = this.data.map(pairs => { return pairs.frequency });
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
