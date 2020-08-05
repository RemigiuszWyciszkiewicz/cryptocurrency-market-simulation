import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[coinMarketConfirmationModalCancelBtn]',
})
export class ConfirmationModalCancelBtnDirective {
  @Input() buttonText: string;
}
