import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CryptocurrencyModule } from '@coin-market/data-access/cryptocurrency';
import { TransactionsModule } from '@coin-market/data-access/transactions';
import { LoaderModule } from '@coin-market/ui/loader';

import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from './market/market.component';

@NgModule({
  declarations: [MarketComponent],
  imports: [CommonModule, MarketRoutingModule, CryptocurrencyModule, TransactionsModule, LoaderModule],
  providers: [],
})
export class MarketModule {}
