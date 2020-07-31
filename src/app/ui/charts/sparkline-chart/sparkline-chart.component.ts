import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ApxChartOptions } from '../apx-chart-options';

@Component({
  selector: 'coin-market-sparkline-chart',
  templateUrl: './sparkline-chart.component.html',
  styleUrls: ['./sparkline-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparklineChartComponent implements OnInit {
  @Input() set data(value) {
    this.chartLineSparkline1Options.series[0].data.push(...value);
  }

  public commonLineSparklineOptions: Partial<ApxChartOptions> = {
    chart: {
      type: 'line',
      width: 100,
      height: 35,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        formatter(value) {
          return value.toFixed(2);
        },
        title: {
          formatter(seriesName) {
            return '';
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  chartLineSparkline1Options = {
    series: [
      {
        name: 'chart-line-sparkline',
        data: [],
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
