import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[coinMarketCustomInputErrors]',
})
export class CustomInputErrorsDirective {
  @Input() type: string;

  constructor(readonly tmp: TemplateRef<any>) {}
}
