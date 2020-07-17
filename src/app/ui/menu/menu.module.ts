import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { SideMenuComponent } from './side-menu/side-menu.component';

const PROVIDERS = [...NbMenuModule.forRoot().providers];
@NgModule({
  declarations: [SideMenuComponent],
  imports: [CommonModule, NbMenuModule],
})
export class MenuModule {
  static providers = [PROVIDERS];
}
