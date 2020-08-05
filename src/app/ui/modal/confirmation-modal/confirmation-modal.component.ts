import { Component, ContentChild, Input, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { ConfirmationModalActionBtnDirective } from './directives/confirmation-modal-action-btn.directive';
import { ConfirmationModalCancelBtnDirective } from './directives/confirmation-modal-cancel-btn.directive';
import { ConfirmationModalContentDirective } from './directives/confirmation-modal-content.directive';
import { ConfirmationModalTitleDirective } from './directives/confirmation-modal-title.directive';

export interface ActionBtnConfig {
  buttonType: string;
  buttonText?: string;
  preventAction: boolean;
}

export interface CancelBtnConfig {
  buttonText?: string;
}

@Component({
  selector: 'coin-market-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  get modalTitle(): string {
    return (this.confirmationModalTitleDir && this.confirmationModalTitleDir.title) || this.title;
  }

  get modalContent(): string {
    return (this.confirmationModalContentDir && this.confirmationModalContentDir.content) || this.content;
  }

  get modalActionBtnConfig(): ActionBtnConfig {
    return this.confirmationModalActionBtnDir || this.action;
  }

  get modalCancelBtnConfig(): CancelBtnConfig {
    return this.confirmationModalCancelBtnDir || this.cancel;
  }

  @Input() title: string;
  @Input() content: string;
  @Input() action: ActionBtnConfig;
  @Input() cancel: CancelBtnConfig;
  @Input() showCancelButton = true;
  @Input() contextRef: NbDialogRef<ConfirmationModalComponent>;

  @ContentChild(ConfirmationModalTitleDirective, { static: true })
  confirmationModalTitleDir: ConfirmationModalTitleDirective;

  @ContentChild(ConfirmationModalContentDirective, { static: true })
  confirmationModalContentDir: ConfirmationModalContentDirective;

  @ContentChild(ConfirmationModalActionBtnDirective, { static: true })
  confirmationModalActionBtnDir: ConfirmationModalActionBtnDirective;

  @ContentChild(ConfirmationModalCancelBtnDirective, { static: true })
  confirmationModalCancelBtnDir: ConfirmationModalCancelBtnDirective;

  constructor(@Optional() private ref: NbDialogRef<ConfirmationModalComponent>) {}

  private get _ref(): NbDialogRef<ConfirmationModalComponent> {
    return this.ref || this.contextRef;
  }

  dismiss(): void {
    this._ref.close(false);
  }

  confirm(): void {
    this._ref.close(true);
  }
}
