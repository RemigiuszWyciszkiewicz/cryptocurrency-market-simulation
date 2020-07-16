import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aumsDigitalCustomInputErrors]'
})
export class CustomInputErrorsDirective {
  @Input() type: string;

  constructor(readonly tmp: TemplateRef<any>) {}
}
