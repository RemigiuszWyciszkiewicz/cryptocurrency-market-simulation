import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CryptocurrenciesModule as CryptocurrenciesModuleDataAccess } from '@coin-market/data-access/cryptocurrencies';
import { FeatureUiComponentsModule } from '@coin-market/ui/feature-ui-components';

import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NewsComponent }]),
    FeatureUiComponentsModule,
    CryptocurrenciesModuleDataAccess,
  ],
})
export class NewsModule {}
