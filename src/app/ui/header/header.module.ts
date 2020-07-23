import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbContextMenuModule, NbUserModule } from '@nebular/theme';

import { UserMenuComponent } from '../header/user-menu/user-menu.component';
import { HeaderComponent } from './header/header.component';

const COMPONENTS = [HeaderComponent, UserMenuComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, NbContextMenuModule, NbUserModule],
})
export class HeaderModule {}
