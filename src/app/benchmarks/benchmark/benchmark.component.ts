import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
declare var $;

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.css']
})
export class BenchmarkComponent implements OnChanges {
  @Input() data: any;
  @Input() name: string;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (this.data.graphData) {
      this.drawChart();
    }
  }

  lastFiveYears() {
    let year = new Date().getUTCFullYear() - 4;
    let years = [];
    for (let _i = 0; _i < 5; _i++) {
      years.push(year);
      year++;
    }
    return years;
  }

  drawChart() {
    if (this.name) {
      $('#' + this.name + '-chart').highcharts({
        chart: {
          type: 'column'
        },
        title: { text: '' },
        yAxis: {
          title: { text: '' }
        },
        xAxis: {
          categories: this.lastFiveYears()
        },
        credits: {
          enabled: false
        },
        series: [{
          color: '#1e7da9',
          name: this.data.graphData[0].name,
          data: this.data.graphData[0].data.slice(-5)
        }, {
          color: '#34b24e',
          name: this.data.graphData[1].name,
          data: this.data.graphData[1].data.slice(-5)
        }]
      })
    }
  }

}
