import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@coin-market/ui/forms';
import { NbCardModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';

import { CoinTransactionModalComponent } from './coin-transaction-modal/coin-transaction-modal.component';
import { ModalCardBodyComponent } from './modal-template-components/modal-card-body/modal-card-body.component';
import { ModalCardFooterComponent } from './modal-template-components/modal-card-footer/modal-card-footer.component';
import { ModalCardComponent } from './modal-template-components/modal-card/modal-card.component';

@NgModule({
  declarations: [CoinTransactionModalComponent, ModalCardComponent, ModalCardBodyComponent, ModalCardFooterComponent],
  imports: [CommonModule, NbDialogModule.forChild(), NbCardModule, NbSpinnerModule, ReactiveFormsModule, FormsModule],
  entryComponents: [CoinTransactionModalComponent],
})
export class ModalModule {}
