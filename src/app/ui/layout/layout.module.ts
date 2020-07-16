import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

import { LayoutComponent } from './layout/layout.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const PROVIDERS = [
  ...NbThemeModule.forRoot().providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];
@NgModule({
  declarations: [LayoutComponent, SideMenuComponent],
  exports: [LayoutComponent, SideMenuComponent],
  imports: [CommonModule, NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule],
})
export class LayoutModule {
  static providers = [PROVIDERS];
}
