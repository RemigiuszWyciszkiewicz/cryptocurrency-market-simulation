import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { DonutChartComponent } from './donut-chart/donut-chart.component';

const COMPONENTS = [DonutChartComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgApexchartsModule],
})
export class ChartsModule {}
