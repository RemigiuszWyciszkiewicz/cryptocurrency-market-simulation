import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthorizationModule, httpInterceptorProviders } from '@coin-market/core/authorization';
import { CryptocurrenciesModule } from '@coin-market/data-access/cryptocurrencies';
import { LayoutModule } from '@coin-market/ui/layout';
import { MenuModule } from '@coin-market/ui/menu';
import { ToastrModule } from '@coin-market/ui/toastr';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CryptocurrenciesModule,
    BrowserAnimationsModule,
    ToastrModule,
    AuthorizationModule,
    NbEvaIconsModule,

    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [LayoutModule.providers, MenuModule.providers, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
