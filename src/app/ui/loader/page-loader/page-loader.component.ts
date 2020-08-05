import { HttpErrorResponse } from '@angular/common/http';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { PageContentTplDirective, PageErrorTplDirective, PageLoaderTplDirective } from '../directives';

@Component({
  selector: 'coin-market-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
})
export class PageLoaderComponent {
  @Input() isLoading: boolean;
  @Input() error: HttpErrorResponse;
  @Input() disableLabel = false;

  @ContentChild(PageContentTplDirective, { static: true }) pageContentTpl: PageContentTplDirective;
  @ContentChild(PageLoaderTplDirective, { static: false }) pageLoaderTpl: PageLoaderTplDirective;
  @ContentChild(PageErrorTplDirective, { static: false }) pageErrorTpl: PageErrorTplDirective;

  hasVisibleContent(): boolean {
    return !this.isLoading && !this.error;
  }

  getCustomLoaderTpl(): TemplateRef<any> {
    return this.pageLoaderTpl && this.pageLoaderTpl.tpl;
  }

  getCustomErrorTpl(): TemplateRef<any> {
    return this.pageErrorTpl && this.pageErrorTpl.tpl;
  }
}
