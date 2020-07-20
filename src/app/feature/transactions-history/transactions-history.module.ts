import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TransactionsHistoryRoutingModule } from './transactions-history-routing.module';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';

@NgModule({
  declarations: [TransactionsHistoryComponent],
  imports: [CommonModule, TransactionsHistoryRoutingModule],
})
export class TransactionsHistoryModule {}
