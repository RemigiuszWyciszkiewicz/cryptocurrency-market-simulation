import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'coin-market-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit {
  constructor() {}

  options = {
    chart: {
      type: 'donut',

      stacked: true,
      stackType: '100%',
      width: '100%',
    },
    title: {
      text: 'Portfolio',
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      fontSize: '15px',
      markers: {
        height: 15,
        width: 15,
        radius: 100,
      },
      itemMargin: {
        vertical: 2.5,
      },
      formatter: (seriesName, opts) => {
        return `<span style="margin-right:10px;">${seriesName} <strong>${
          opts.w.globals.series[opts.seriesIndex]
        }</strong></span>`;
      },
    },

    series: [1, 1, 1],

    labels: ['Apple', 'Mango', 'Orange'],
  };

  ngOnInit(): void {}
}
