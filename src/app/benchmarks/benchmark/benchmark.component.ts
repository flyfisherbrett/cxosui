import { Component, OnChanges, Input } from '@angular/core';
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

  ngOnChanges() {
    if (this.data.graphData) {
      this.drawChart();
    }
  }

  drawChart() {
    if (this.name) {
      $('#' + this.name + '-chart').highcharts({
        chart: {
          type: 'column'
        },
        title: { text: ''},
        yAxis: {
          title: { text: ''}
        },
        xAxis: {
          categories: [2012, 2013, 2014, 2015, 2016] // should not be static, change asap
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
