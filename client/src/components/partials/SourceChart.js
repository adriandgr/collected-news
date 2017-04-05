import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ['dataSet'],
  mounted () {
    const sourceNames = this.dataSet.map(source => { return source.name });
    const sentiments = this.dataSet.map(source => { return (source.avg_sentiment * 10).toFixed(3) });
    const numberOfArticlesPerSource = this.dataSet.map(source => { return source.total_articles });
    const colours = this.dataSet.map(source => {
      if (source.avg_sentiment > 0.015) {
        return '#68A423';
      } else if (source.avg_sentiment > -0.015 && source.avg_sentiment < 0.015) {
        return '#605B4A';
      } else {
        return '#B52626';
      }
    });
    this.renderChart({
      labels: sentiments,
      datasets: [
        {
          // backgroundColor: '#f87979',
          backgroundColor: colours,
          data: numberOfArticlesPerSource
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
            ticks: { display: false },
            scaleLabel: {
              display: true,
              labelString: '# of articles'
            }
          }],
          xAxes: [{
              categoryPercentage: 0.95,
              barPercentage: 0.95,
              ticks: { display: false },
              scaleLabel: {
                display: true,
                labelString: 'sentiment'
              }
          }]
        }
       })
  }
})
