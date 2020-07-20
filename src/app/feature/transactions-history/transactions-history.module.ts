import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransactionsModule } from '@coin-market/data-access/transactions';

import { TransactionsHistoryRoutingModule } from './transactions-history-routing.module';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';

@NgModule({
  declarations: [TransactionsHistoryComponent],
  imports: [CommonModule, TransactionsHistoryRoutingModule, TransactionsModule],
})
export class TransactionsHistoryModule {}
