import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetsModule } from '@coin-market/data-access/assets';
import { CryptocurrencyModule } from '@coin-market/data-access/cryptocurrency';
import { TransactionsModule } from '@coin-market/data-access/transactions';
import { LoaderModule } from '@coin-market/ui/loader';
import { ModalModule } from '@coin-market/ui/modal';

import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from './market/market.component';

@NgModule({
  declarations: [MarketComponent],
  imports: [CommonModule, MarketRoutingModule, CryptocurrencyModule, AssetsModule, TransactionsModule, LoaderModule, ModalModule],
  providers: [],
})
export class MarketModule {}
