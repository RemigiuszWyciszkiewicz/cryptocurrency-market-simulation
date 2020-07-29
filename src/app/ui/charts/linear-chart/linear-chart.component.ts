import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ApxChartOptions } from '../apx-chart-options';

@Component({
  selector: 'coin-market-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearChartComponent {
  constructor() {}

  @Input() set data(value: number[][]) {
    if (value) {
      this.options.series[0]['data'].push(...value);
    }
  }

  options: Partial<ApxChartOptions> = {
    chart: {
      height: 380,
      width: '100%',
      type: 'area',
      animations: {
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    stroke: {
      curve: 'straight',
    },

    dataLabels: {
      formatter: (val, opts) => {
        return val.toFixed(2);
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [],
      },
    ],
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: (val, opts) => {
          return val.toFixed(2);
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  };
}
