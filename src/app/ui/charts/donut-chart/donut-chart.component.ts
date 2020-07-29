import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from '@coin-market/ui/toastr';

import { ApxChartOptions } from '../apx-chart-options';

export interface DonutChartData {
  labels: string[];
  values: number[];
}

@Component({
  selector: 'coin-market-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit {
  constructor(private readonly _toastrService: ToastrService) {}

  @Input() set data(data: DonutChartData) {
    this.options.labels = data.labels;
    this.options.series = data.values;
  }

  options: Partial<ApxChartOptions> = {
    chart: {
      type: 'donut',
      stacked: true,
      // stackType: '100%',
      width: '100%',
    },
    legend: {
      position: 'bottom',

      formatter: (seriesName, opts) => {
        return `<span style="margin-right:10px;">${seriesName} <strong>$${Number(opts.w.globals.series[opts.seriesIndex]).toFixed(
          2
        )}</strong></span>`;
      },
    },
    title: {},
    series: [],
    labels: [],
    colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],

    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: false,
      y: {
        formatter(val) {
          return val.toFixed(2);
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              formatter: (val: string) => {
                return val;
              },
              fontWeight: 600,
            },
            value: {
              formatter: (val: string) => {
                return '$' + Number(val).toFixed(2);
              },
              offsetY: -2,
              show: true,
            },
            total: {
              show: false,
            },
          },
        },
      },
    },
  };

  ngOnInit(): void {}
}
