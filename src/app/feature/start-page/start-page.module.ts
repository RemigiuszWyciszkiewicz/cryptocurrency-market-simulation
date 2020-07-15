import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, UserFormBuilder } from 'src/app/ui/forms/index';
import { StartPageRoutingModule } from './start-page-routing.module';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginFormComponent } from './start-page/login-form/login-form.component';
import { RegisterFormComponent } from './start-page/register-form/register-form.component';

@NgModule({
  declarations: [StartPageComponent, LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, StartPageRoutingModule, FormsModule],
  providers: [UserFormBuilder],
})
export class StartPageModule {}
