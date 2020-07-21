import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthorizationModule, httpInterceptorProviders } from '@coin-market/core/authorization';
import { LayoutModule } from '@coin-market/ui/layout';
import { MenuModule } from '@coin-market/ui/menu';
import { ToastrModule } from '@coin-market/ui/toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionListWidgetComponent } from './action-list-widget/action-list-widget.component';

@NgModule({
  declarations: [AppComponent, ActionListWidgetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule,
    AuthorizationModule,
  ],
  providers: [LayoutModule.providers, MenuModule.providers, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
