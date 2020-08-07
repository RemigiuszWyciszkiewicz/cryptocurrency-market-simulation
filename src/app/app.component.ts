import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  CryptocurrenciesQuery,
  CryptocurrenciesService,
  CryptocurrenciesStore
} from '@coin-market/data-access/cryptocurrencies';
import { UserMenuOption } from '@coin-market/ui/header';
import { NbIconLibraries, NbMenuBag, NbMenuService } from '@nebular/theme';
import { filter } from 'rxjs/operators';

import { AuthService } from './core/authorization';
import { UserStore } from './data-access/user';

declare let gtag: Function;
@Component({
  selector: 'coin-market',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _cryptocurrenciesService: CryptocurrenciesService,
    private readonly _cryptocurrenciesStore: CryptocurrenciesStore,
    private readonly _cryptocurrenciesQuery: CryptocurrenciesQuery,
    private readonly _iconLibraries: NbIconLibraries,
    private readonly _nbMenuService: NbMenuService,
    private readonly _authService: AuthService,
    private readonly _userStore: UserStore,
    private readonly _router: Router
  ) {
    this._iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa', packClass: 'fa' });
  }

  ngOnInit(): void {
    this.initializeGoogleAnalyticsTrackling();
    this.fetchCryptocurrencies();
    this.startListeningOnLogoutAction();
  }

  startListeningOnLogoutAction(): void {
    this._nbMenuService
      .onItemClick()
      .pipe(filter(this.filterUserMenuEvents))
      .subscribe(() => {
        this._authService.setUserAuthorizationStatus(false);
        this._userStore.reset();
      });
  }

  filterUserMenuEvents(value: NbMenuBag): boolean {
    return value.tag === 'userMenu' && value.item.title === UserMenuOption.LOGOUT;
  }

  fetchCryptocurrencies(): void {
    if (!this._cryptocurrenciesQuery.hasEntity()) {
      this._cryptocurrenciesService.getCryptocurrenciesList().subscribe((value) => {
        this._cryptocurrenciesStore.add(value);
      });
    }
  }

  initializeGoogleAnalyticsTrackling(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-174901242-1', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
