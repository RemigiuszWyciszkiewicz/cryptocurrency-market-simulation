import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CryptocurrencyModule as CryptocurrencyDetailsModuleDataAccess } from '@coin-market/data-access/cryptocurrency';
import { NbCardModule } from '@nebular/theme';

import { CryptocurrencyDetailsChartComponent } from './cryptocurrency-details-chart/cryptocurrency-details-chart.component';
import {
  CryptocurrencyDetailsCurrentDataComponent
} from './cryptocurrency-details-current-data/cryptocurrency-details-current-data.component';
import { CryptocurrencyDetailsNewsComponent } from './cryptocurrency-details-news/cryptocurrency-details-news.component';
import { CryptocurrencyDetailsComponent } from './cryptocurrency-details.component';

const COMPONENTS = [
  CryptocurrencyDetailsComponent,
  CryptocurrencyDetailsCurrentDataComponent,
  CryptocurrencyDetailsNewsComponent,
  CryptocurrencyDetailsChartComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    NbCardModule,
    CryptocurrencyDetailsModuleDataAccess,
    RouterModule.forChild([{ path: '', component: CryptocurrencyDetailsComponent }]),
  ],
})
export class CryptocurrencyDetailsModule {}
