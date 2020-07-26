import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CryptocurrencyModule } from '@coin-market/data-access/cryptocurrency';
import { FormsModule, UserFormBuilder } from '@coin-market/ui/forms';

import { StartPageRoutingModule } from './start-page-routing.module';
import { LoginFormComponent } from './start-page/login-form/login-form.component';
import { RegisterFormComponent } from './start-page/register-form/register-form.component';
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [StartPageComponent, LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, StartPageRoutingModule, FormsModule, CryptocurrencyModule],
  providers: [UserFormBuilder],
})
export class StartPageModule {}
