import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aumsDigitalPageErrorTpl]'
})
export class PageErrorTplDirective {
  constructor(readonly tpl: TemplateRef<any>) {}
}
