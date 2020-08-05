import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[coinMarketConfirmationModalTitle]',
})
export class ConfirmationModalTitleDirective {
  @Input('coinMarketConfirmationModalTitle') title: string;
}
