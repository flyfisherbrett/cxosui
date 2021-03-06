import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
declare var $;

@Component({
    selector: 'app-cash-flow-chart',
    templateUrl: './cash-flow-chart.component.html',
    styles: [`
        .cash-flow-chart {
            height: 325px;
        }
    `]
})
export class CashFlowChartComponent implements OnChanges {
    @Input() user;
    @Input() company;
    @Input() data: any;
    @Input() projection: any;
    @Input() flags: any;
    options: {};

    ngOnChanges(changes: SimpleChanges) {
        if (this.data) { this.drawChart(); }
    }

    drawChart() {
        this.data.total.data.unshift(this.data.actual[this.data.actual.length - 1]);

        $('.cash-flow-chart').highcharts('StockChart', {
            yAxis: {
                title: 'Cash',
                startOnTick: false
            },
            xAxis: {
                type: 'datetime',
                plotBands: [{
                    from: this.data.total.data[1][0],
                    to: this.data.total.data[this.data.total.data.length - 1][0],
                    color: 'rgba(30, 125, 169, 0.15)'
                }],
                ordinal: false
            },
            rangeSelector: {
                selected: 0,
                inputEnabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                area: {
                    animation: false,
                    color: '#a5d6a7',
                    fillColor: 'rgba(37, 159, 120, 0.25)',
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    }
                }
            },
            series: [{
                type: 'area',
                id: 'cash',
                name: 'Balance',
                tooltip: {
                    pointFormat: 'Balance: ${point.y:,.2f}',
                    useHTML: true
                },
                data: this.data.actual.concat(this.projection)
            }, {
                type: 'flags',
                onSeries: 'cash',
                data: this.flags.reduce((memo, flag) => {
                    let match = memo.filter(f => { return flag.x === f.x; })[0];
                    if (match) {
                        let i = memo.indexOf(match);
                        match.title = 'Multi';
                        match.text = '<p>' + match.text + '</p><br><p>' + flag.description + '</p>';
                        memo[i] = match;
                    } else {
                        memo.push({
                            x: flag.x,
                            title: flag.title,
                            text: flag.description
                        });
                    }
                    return memo;
                }, [])
            }
            ]
        });
    }
}
