import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aumsDigitalPageLoaderTpl]'
})
export class PageLoaderTplDirective {
  constructor(readonly tpl: TemplateRef<any>) {}
}
