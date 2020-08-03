import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CryptocurrenciesModule as CryptocurrenciesModuleDataAccess } from '@coin-market/data-access/cryptocurrencies';
import { FeatureUiComponentsModule } from '@coin-market/ui/feature-ui-components';
import { LoaderModule } from '@coin-market/ui/loader';

import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    LoaderModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: NewsComponent }]),
    FeatureUiComponentsModule,
    CryptocurrenciesModuleDataAccess,
  ],
})
export class NewsModule {}
