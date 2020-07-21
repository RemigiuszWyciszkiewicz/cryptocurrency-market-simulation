import { Component, OnInit } from '@angular/core';

import { ApxChartOptions } from '../apx-chart-options';

@Component({
  selector: 'coin-market-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit {
  constructor() {}

  options: Partial<ApxChartOptions> = {
    chart: {
      type: 'donut',

      stacked: true,
      stackType: '100%',
      width: '100%',
    },
    legend: {
      position: 'bottom',
      formatter: (seriesName, opts) => {
        return `<span style="margin-right:10px;">${seriesName} <strong>${
          opts.w.globals.series[opts.seriesIndex]
        }</strong></span>`;
      },
    },
    title: {
      text: 'Portfolio',
    },

    series: [1, 2, 3],

    labels: ['Apple', 'Mango', 'Orange'],
  };

  ngOnInit(): void {}
}
