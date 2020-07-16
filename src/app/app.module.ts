import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@coin-market/ui/layout';
import { ToastrModule } from '@coin-market/ui/toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, RouterModule, BrowserAnimationsModule, ToastrModule],
  providers: [LayoutModule.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
