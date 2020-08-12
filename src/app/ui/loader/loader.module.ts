import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorComponentsModule } from '@coin-market/ui/error-components';
import { NbSpinnerModule } from '@nebular/theme';

import { CardModule } from '../card';
import { SpinnerComponent } from './bootstrap-spinner/bootstrap-spinner.component';
import { PageContentTplDirective } from './directives/page-content-tpl.directive';
import { PageErrorTplDirective } from './directives/page-error-tpl.directive';
import { PageLoaderTplDirective } from './directives/page-loader-tpl.directive';
import { PageLoaderComponent } from './page-loader/page-loader.component';

const COMPONENTS = [PageLoaderComponent, SpinnerComponent];
const DIRECTIVES = [PageContentTplDirective, PageLoaderTplDirective, PageErrorTplDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, ErrorComponentsModule, NbSpinnerModule, CardModule],
})
export class LoaderModule {}
