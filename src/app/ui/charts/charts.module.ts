import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { LinearChartComponent } from './linear-chart/linear-chart.component';
import { SparklineChartComponent } from './sparkline-chart/sparkline-chart.component';

const COMPONENTS = [DonutChartComponent, LinearChartComponent, SparklineChartComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgApexchartsModule],
})
export class ChartsModule {}
