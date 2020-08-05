import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@coin-market/ui/forms';
import { NbCardModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';

import { CoinTransactionModalComponent } from './coin-transaction-modal/coin-transaction-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import {
  ConfirmationModalActionBtnDirective
} from './confirmation-modal/directives/confirmation-modal-action-btn.directive';
import {
  ConfirmationModalCancelBtnDirective
} from './confirmation-modal/directives/confirmation-modal-cancel-btn.directive';
import { ConfirmationModalContentDirective } from './confirmation-modal/directives/confirmation-modal-content.directive';
import { ConfirmationModalTitleDirective } from './confirmation-modal/directives/confirmation-modal-title.directive';
import { ModalCardBodyComponent } from './modal-template-components/modal-card-body/modal-card-body.component';
import { ModalCardFooterComponent } from './modal-template-components/modal-card-footer/modal-card-footer.component';
import { ModalCardComponent } from './modal-template-components/modal-card/modal-card.component';

const COMPONENTS = [
  CoinTransactionModalComponent,
  ModalCardComponent,
  ModalCardBodyComponent,
  ModalCardFooterComponent,
  ConfirmationModalComponent,
];

const DIRECTIVES = [
  ConfirmationModalActionBtnDirective,
  ConfirmationModalCancelBtnDirective,
  ConfirmationModalContentDirective,
  ConfirmationModalTitleDirective,
];
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, NbDialogModule.forChild(), NbCardModule, NbSpinnerModule, ReactiveFormsModule, FormsModule],
  entryComponents: [CoinTransactionModalComponent, ConfirmationModalComponent],
})
export class ModalModule {}
