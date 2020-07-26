import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { CompactSideMenuComponent } from './compact-side-menu/compact-side-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const PROVIDERS = [...NbMenuModule.forRoot().providers];
const COMPONENTS = [SideMenuComponent, CompactSideMenuComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, NbMenuModule],
  exports: [...COMPONENTS],
})
export class MenuModule {
  static providers = [PROVIDERS];
}
