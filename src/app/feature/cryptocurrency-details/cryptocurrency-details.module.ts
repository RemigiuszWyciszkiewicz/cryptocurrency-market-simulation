import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule as ChartsModuleDataAccess } from '@coin-market/data-access/charts';
import { CryptocurrencyModule as CryptocurrencyDetailsModuleDataAccess } from '@coin-market/data-access/cryptocurrency';
import { CardModule } from '@coin-market/ui/card';
import { ChartsModule } from '@coin-market/ui/charts';
import { ThemeDirectivesModule } from '@coin-market/utils/directives';

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
    CardModule,
    ChartsModuleDataAccess,
    ChartsModule,
    CryptocurrencyDetailsModuleDataAccess,
    RouterModule.forChild([{ path: '', component: CryptocurrencyDetailsComponent }]),
    ThemeDirectivesModule,
  ],
})
export class CryptocurrencyDetailsModule {}
