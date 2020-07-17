import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { SideMenuComponent } from './side-menu/side-menu.component';

const PROVIDERS = [...NbMenuModule.forRoot().providers];
const COMPONENTS = [SideMenuComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, NbMenuModule],
  exports: [...COMPONENTS],
})
export class MenuModule {
  static providers = [PROVIDERS];
}
