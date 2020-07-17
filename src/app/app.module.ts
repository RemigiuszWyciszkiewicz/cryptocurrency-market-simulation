import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthorizationModule } from '@coin-market/data-access/authorization';
import { LayoutModule } from '@coin-market/ui/layout';
import { MenuModule } from '@coin-market/ui/menu';
import { ToastrModule } from '@coin-market/ui/toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule,
    AuthorizationModule,
  ],
  providers: [LayoutModule.providers, MenuModule.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
