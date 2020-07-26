import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import {
  CryptocurrenciesQuery,
  CryptocurrenciesStore,
  CryptocurrencyService
} from '@coin-market/data-access/cryptocurrency';
import { Asset, AssetDictionary, Transaction, TransactionType } from '@coin-market/data-access/models';
import { Cryptocurrency } from '@coin-market/data-access/models/cryptocurrency';
import { TransactionsQuery, TransactionsService, TransactionStore } from '@coin-market/data-access/transactions';
import { UserQuery, UserStore } from '@coin-market/data-access/user';
import { CoinTransactionModalComponent } from '@coin-market/ui/modal';
import { ToastrService } from '@coin-market/ui/toastr';
import { NbDialogService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  constructor(
    private readonly _assetsService: AssetsService,
    private readonly _userQuery: UserQuery,
    private readonly _router: Router,
    private readonly _userStore: UserStore,
    private readonly _toastrService: ToastrService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _nbDialogService: NbDialogService,
    private readonly _transactionService: TransactionsService,
    private readonly _transactionStore: TransactionStore,
    private readonly _transactionsQuery: TransactionsQuery,
    private readonly _cryptocurrenciesStore: CryptocurrenciesStore,
    private readonly _cryptocurrenciesQuery: CryptocurrenciesQuery,
    private readonly _cryptocurrencyService: CryptocurrencyService
  ) {}

  isLoading = this._cryptocurrenciesQuery.selectLoading();

  serverError: HttpErrorResponse;

  cryptocurrencies$: Observable<Cryptocurrency[]> = this._cryptocurrenciesQuery.selectAll();
  assets: AssetDictionary;

  ngOnInit(): void {
    console.log('does has entity ', this._cryptocurrenciesQuery.hasEntity());
    if (!this._cryptocurrenciesQuery.hasEntity()) {
      this.fetchAllCryptocurrencies();
    }

    this.fetchAllAssets();
  }

  buy(coin: Cryptocurrency): void {
    this._nbDialogService
      .open(CoinTransactionModalComponent, {
        context: { cryptocurrency: coin, transactionType: TransactionType.PURCHASE, usdLimit: this._userQuery.getUSD() },
      })
      .onClose.pipe(
        filter(Boolean),
        switchMap((value) => {
          return this._transactionService.saveTransaction(value, this._userQuery.getId());
        })
      )
      .subscribe(
        (transaction: Transaction) => {
          this._toastrService.success('Transaction completed');
          this._userStore.update((state) => ({ user: { ...state.user, usd: state.user.usd - transaction.value } }));
          this._transactionsQuery.hasEntity() ? this._transactionStore.add(transaction) : null;
          this.assets[transaction.cryptocurrency].quantity += transaction.quantity;
        },
        (error: HttpErrorResponse) => {
          this._toastrService.error('ERROR: ' + error.error.message);
        }
      );
  }

  sell(coin: Cryptocurrency): void {
    this._nbDialogService
      .open(CoinTransactionModalComponent, {
        context: { cryptocurrency: coin, transactionType: TransactionType.SALE, quantityLimit: this.assets[coin.id].quantity },
      })
      .onClose.pipe(
        filter(Boolean),
        switchMap((value) => {
          return this._transactionService.saveTransaction(value, this._userQuery.getId());
        })
      )
      .subscribe(
        (transaction: Transaction) => {
          this._toastrService.success('Transaction completed');
          this._userStore.update((state) => ({ user: { ...state.user, usd: state.user.usd + transaction.value } }));
          this.assets[transaction.cryptocurrency].quantity -= transaction.quantity;
        },
        (error: HttpErrorResponse) => {
          this._toastrService.error('ERROR: ' + error.error.message);
        }
      );
  }

  fetchAllCryptocurrencies(): void {
    this._cryptocurrencyService
      .getCryptocurrenciesList()
      .pipe(
        tap((value: Cryptocurrency[]) => {
          this._cryptocurrenciesStore.set(value);
        }),
        catchError((error: HttpErrorResponse) => {
          this.serverError = error;
          this._toastrService.error('ERROR: ' + error.error.message);
          return of(error);
        })
      )
      .subscribe();
  }

  fetchAllAssets(): void {
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
      .subscribe(console.log);
  }

  mapAssetsToDictionary(assets: Asset[]): AssetDictionary {
    return assets.reduce((pr, cr) => {
      return { ...pr, [cr.cryptocurrency]: cr };
    }, {});
  }

  redirectToDetails(coin: Cryptocurrency): void {
    this._router.navigate([coin.id], { relativeTo: this._activatedRoute });
  }
}
