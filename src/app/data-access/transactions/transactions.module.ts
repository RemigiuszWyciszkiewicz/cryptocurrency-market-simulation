import { NgModule } from '@angular/core';
import { ModalModule } from '@coin-market/ui/modal';

import { TransactionsService } from './transactions.service';

@NgModule({
  declarations: [],
  imports: [ModalModule],
  providers: [TransactionsService],
})
export class TransactionsModule {}
