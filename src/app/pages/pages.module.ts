import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { ErrorComponentsModule } from '../ui/error-components';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ErrorComponentsModule,
  ],
})
export class PagesModule {}
