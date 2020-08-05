import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[coinMarketConfirmationModalActionBtn]',
})
export class ConfirmationModalActionBtnDirective {
  @Input() buttonText: string;
  @Input() buttonType = 'danger';
  @Input() preventAction = true;
}
