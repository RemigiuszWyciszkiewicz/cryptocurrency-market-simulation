import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, UserFormBuilder } from '@coin-market/ui/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { StartPageRoutingModule } from './start-page-routing.module';
import { LoginFormComponent } from './start-page/login-form/login-form.component';
import { RegisterFormComponent } from './start-page/register-form/register-form.component';
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [StartPageComponent, LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, StartPageRoutingModule, FormsModule, RecaptchaModule, RecaptchaFormsModule],
  providers: [
    UserFormBuilder,
    { provide: RECAPTCHA_SETTINGS, useValue: { siteKey: '6LdnCbgZAAAAAHY9rts1ncT1vTWnzqx0Ipel2R7R' } },
  ],
})
export class StartPageModule {}
