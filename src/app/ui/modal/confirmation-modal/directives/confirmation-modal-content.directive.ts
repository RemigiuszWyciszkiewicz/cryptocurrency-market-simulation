import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[coinMarketConfirmationModalContent]',
})
export class ConfirmationModalContentDirective {
  @Input('coinMarketConfirmationModalContent') content: string;
}
