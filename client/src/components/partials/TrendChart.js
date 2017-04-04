import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['data'],
  mounted () {
    const dataPoints = this.data.dataPoints;
    const empty = dataPoints.map(each => { return '' });
    this.renderChart({
      labels: empty,
      datasets: [
        {
          label: 'label',
          pointRadius: 0,
          fill: 0,
          borderColor: '#000',
          backgroundColor: '#000',
          data: dataPoints
        }
      ]
    }, {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              display: false,
              beginAtZero: false
            },
          }],
          xAxes: [{
              ticks: { display: false },
          }]
        }
       })
  }
})
