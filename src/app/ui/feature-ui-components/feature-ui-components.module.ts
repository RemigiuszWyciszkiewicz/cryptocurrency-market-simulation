import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '@coin-market/ui/card';

import { CryptocurrencyDetailsNewsComponent } from './cryptocurrency-details-news/cryptocurrency-details-news.component';

const COMPONENTS = [CryptocurrencyDetailsNewsComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, CardModule],
})
export class FeatureUiComponentsModule {}
