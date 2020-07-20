import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aumsDigitalPageContentTpl]',
})
export class PageContentTplDirective {
  constructor(readonly tpl: TemplateRef<any>) {}
}
