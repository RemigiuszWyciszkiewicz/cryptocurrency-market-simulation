import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import {
  CryptocurrenciesQuery,
  CryptocurrenciesService,
  CryptocurrenciesStore
} from '@coin-market/data-access/cryptocurrencies';
import { Asset, AssetDictionary } from '@coin-market/data-access/models';
import { Cryptocurrency } from '@coin-market/data-access/models/cryptocurrency';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { UserQuery } from '@coin-market/data-access/user';
import { ToastrService } from '@coin-market/ui/toastr';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _userQuery: UserQuery,
    private readonly _assetsService: AssetsService,
    private readonly _toastrService: ToastrService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _transactionService: TransactionsService,
    private readonly _cryptocurrenciesStore: CryptocurrenciesStore,
    private readonly _cryptocurrenciesQuery: CryptocurrenciesQuery,
    private readonly _cryptocurrenciesService: CryptocurrenciesService
  ) {}

  loading = false;

  serverError: HttpErrorResponse;

  cryptocurrencies$: Observable<Cryptocurrency[]> = this._cryptocurrenciesQuery.selectAll();
  assets: AssetDictionary;

  ngOnInit(): void {
    if (!this._cryptocurrenciesQuery.hasEntity()) {
      this.fetchCryptocurrencies();
    }

    this.fetchAssets();
  }

  buy(coin: Cryptocurrency): void {
    this._transactionService.buy(coin, this.assets[coin.id]);
  }

  sell(coin: Cryptocurrency): void {
    this._transactionService.sell(coin, this.assets[coin.id]);
  }

  fetchCryptocurrencies(): void {
    this.loading = true;
    this._cryptocurrenciesService
      .getCryptocurrenciesList()
      .pipe(
        tap((value: Cryptocurrency[]) => {
          this._cryptocurrenciesStore.set(value);
        }),
        catchError((error: HttpErrorResponse) => {
          this.serverError = error;
          this._toastrService.error('ERROR: ' + error.error.message);
          return of(error);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  fetchAssets(): void {
    this._assetsService
      .getAllAssets(this._userQuery.getId())
      .pipe(
        tap((value: Asset[]) => {
          this.assets = this.mapAssetsToDictionary(value);
        }),
        catchError((error: HttpErrorResponse) => {
          this.serverError = error;
          this._toastrService.error('ERROR: ' + error.error.message);
          return of(error);
        })
      )
      .subscribe();
  }

  mapAssetsToDictionary(assets: Asset[]): AssetDictionary {
    return assets.reduce((pr, cr) => {
      return { ...pr, [cr.id]: cr };
    }, {});
  }

  redirectToDetails(coin: Cryptocurrency): void {
    this._router.navigate([coin.id], { relativeTo: this._activatedRoute });
  }
}
