import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; // ApexMarkers;
  stroke: ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'coin-market-sparkline-chart',
  templateUrl: './sparkline-chart.component.html',
  styleUrls: ['./sparkline-chart.component.scss'],
})
export class SparklineChartComponent implements OnInit {
  @Input() set data(value) {
    this.chartLineSparkline1Options.series[0].data.push(...value);
  }

  public commonLineSparklineOptions: Partial<ChartOptions> = {
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
