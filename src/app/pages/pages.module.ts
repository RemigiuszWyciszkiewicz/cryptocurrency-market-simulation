import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, PagesRoutingModule, RouterModule],
})
export class PagesModule {}
