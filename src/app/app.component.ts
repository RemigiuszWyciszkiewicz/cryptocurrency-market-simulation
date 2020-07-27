import { Component, OnInit } from '@angular/core';
import {
  CryptocurrenciesQuery,
  CryptocurrenciesStore,
  CryptocurrencyService
} from '@coin-market/data-access/cryptocurrency';
import { UserMenuOption } from '@coin-market/ui/header';
import { NbMenuBag, NbMenuService } from '@nebular/theme';
import { filter } from 'rxjs/operators';

import { AuthService } from './core/authorization';
import { UserStore } from './data-access/user';

@Component({
  selector: 'coin-market',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _cryptocurrenciesService: CryptocurrencyService,
    private readonly _cryptocurrenciesStore: CryptocurrenciesStore,
    private readonly _cryptocurrenciesQuery: CryptocurrenciesQuery,
    private readonly _nbMenuService: NbMenuService,
    private readonly _authService: AuthService,
    private readonly _userStore: UserStore
  ) {}

  ngOnInit(): void {
    if (!this._cryptocurrenciesQuery.hasEntity()) {
      this.fetchCryptocurrencies();
    }
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
    this._cryptocurrenciesService.getCryptocurrenciesList().subscribe((value) => {
      this._cryptocurrenciesStore.add(value);
    });
  }
}
