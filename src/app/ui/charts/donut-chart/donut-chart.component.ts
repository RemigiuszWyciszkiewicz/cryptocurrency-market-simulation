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
      onItemHover: { highlightDataSeries: true },
      position: 'bottom',
      formatter: (seriesName, opts) => {
        return `<span style="margin-right:10px;">${seriesName} <strong>${Number(opts.w.globals.series[opts.seriesIndex]).toFixed(
          2
        )}</strong></span>`;
      },
    },
    title: {
      text: 'Portfolio',
      align: 'center',
      offsetY: -5,
    },
    series: [],
    labels: [],
    tooltip: {
      y: {
        formatter(val) {
          return val.toFixed(2);
        },
      },
    },
  };

  ngOnInit(): void {}
}
