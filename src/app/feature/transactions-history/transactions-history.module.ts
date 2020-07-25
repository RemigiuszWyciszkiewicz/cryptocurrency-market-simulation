import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransactionsModule } from '@coin-market/data-access/transactions';
import { CardModule } from '@coin-market/ui/card';
import { LoaderModule } from '@coin-market/ui/loader';

import { TransactionsHistoryRoutingModule } from './transactions-history-routing.module';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';

@NgModule({
  declarations: [TransactionsHistoryComponent],
  imports: [CommonModule, TransactionsHistoryRoutingModule, TransactionsModule, LoaderModule, CardModule],
})
export class TransactionsHistoryModule {}
