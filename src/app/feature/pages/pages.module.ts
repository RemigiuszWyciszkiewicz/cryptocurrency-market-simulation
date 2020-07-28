import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponentsModule } from '@coin-market/ui/error-components';
import { LayoutModule } from '@coin-market/ui/layout';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, PagesRoutingModule, RouterModule, ErrorComponentsModule, LayoutModule],
})
export class PagesModule {}
