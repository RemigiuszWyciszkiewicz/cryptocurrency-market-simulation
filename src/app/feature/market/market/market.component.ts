import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { Asset, AssetDictionary, TransactionType } from '@coin-market/data-access/models';
import { Cryptocurrency } from '@coin-market/data-access/models/cryptocurrency';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { CoinTransactionModalComponent } from '@coin-market/ui/modal';
import { ToastrService } from '@coin-market/ui/toastr';
import { NbDialogService } from '@nebular/theme';
import { of } from 'rxjs';
import { catchError, filter, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  constructor(
    private readonly _assetsService: AssetsService,
    private readonly _toastrService: ToastrService,
    private readonly _nbDialogService: NbDialogService,
    private readonly _tokenStorage: TokenStorageService,
    private readonly _transactionService: TransactionsService,

    private readonly _cryptocurrencyService: CryptocurrencyService
  ) {}

  isLoading = true;
  serverError: HttpErrorResponse;

  cryptocurrencies: Cryptocurrency[];
  assets: AssetDictionary;

  ngOnInit(): void {
    this.fetchAllCryptocurrencies();
    this.fetchAllAssets();
  }

  buy(coin: Cryptocurrency): void {
    this._nbDialogService
      .open(CoinTransactionModalComponent, {
        context: { cryptocurrency: coin, transactionType: TransactionType.PURCHASE, usdLimit: 10000 },
      })
      .onClose.pipe(
        filter(Boolean),
        switchMap((value) => {
          return this._transactionService.saveTransaction(value, this._tokenStorage.getId());
        })
      )
      .subscribe(
        () => {
          this._toastrService.success('Transaction completed');
        },
        (error: HttpErrorResponse) => {
          this._toastrService.error('ERROR: ' + error.error.message);
        }
      );
  }

  sell(coin: Cryptocurrency): void {
    this._nbDialogService
      .open(CoinTransactionModalComponent, {
        context: { cryptocurrency: coin, transactionType: TransactionType.SALE, quantityLimit: this.assets[coin.id].amount },
      })
      .onClose.pipe(
        filter(Boolean),
        switchMap((value) => {
          return this._transactionService.saveTransaction(value, this._tokenStorage.getId());
        })
      )
      .subscribe(
        () => {
          this._toastrService.success('Transaction completed');
        },
        (error: HttpErrorResponse) => {
          this._toastrService.error('ERROR: ' + error.error.message);
        }
      );
  }

  fetchAllCryptocurrencies(): void {
    this._cryptocurrencyService
      .getAllCryptocurrencies()
      .pipe(
        tap((value: Cryptocurrency[]) => {
          this.cryptocurrencies = value;
        }),
        catchError((error: HttpErrorResponse) => {
          this.serverError = error;
          this._toastrService.error('ERROR: ' + error.error.message);
          return of(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  fetchAllAssets(): void {
    this._assetsService
      .getAllAssets(this._tokenStorage.getId())
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
}
