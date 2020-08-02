import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule as ChartsModuleDataAccess } from '@coin-market/data-access/charts';
import { CryptocurrenciesModule as CryptocurrenciesModuleDataAccess } from '@coin-market/data-access/cryptocurrencies';
import { TransactionsModule } from '@coin-market/data-access/transactions';
import { CardModule } from '@coin-market/ui/card';
import { ChartsModule } from '@coin-market/ui/charts';
import { FeatureUiComponentsModule } from '@coin-market/ui/feature-ui-components';
import { FormsModule } from '@coin-market/ui/forms';
import { ThemeDirectivesModule } from '@coin-market/utils/directives';

import { CryptocurrencyDetailsChartComponent } from './cryptocurrency-details-chart/cryptocurrency-details-chart.component';
import {
  CryptocurrencyDetailsCurrentDataComponent
} from './cryptocurrency-details-current-data/cryptocurrency-details-current-data.component';
import { CryptocurrencyDetailsComponent } from './cryptocurrency-details.component';

const COMPONENTS = [
  CryptocurrencyDetailsComponent,
  CryptocurrencyDetailsCurrentDataComponent,
  CryptocurrencyDetailsChartComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CardModule,
    ChartsModuleDataAccess,
    FeatureUiComponentsModule,
    ChartsModule,
    CryptocurrenciesModuleDataAccess,
    RouterModule.forChild([{ path: '', component: CryptocurrencyDetailsComponent }]),
    ThemeDirectivesModule,
    FormsModule,
    TransactionsModule,
  ],
})
export class CryptocurrencyDetailsModule {}
