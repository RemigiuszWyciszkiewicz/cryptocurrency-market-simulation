import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { TransactionType } from '@coin-market/data-access/models';
import { Cryptocurrency } from '@coin-market/data-access/models/cryptocurrency';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { CoinTransactionModalComponent } from '@coin-market/ui/modal';
import { ToastrService } from '@coin-market/ui/toastr';
import { NbDialogService } from '@nebular/theme';
import { of } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  constructor(
    private readonly _toastrService: ToastrService,
    private readonly _nbDialogService: NbDialogService,
    private readonly _tokenStorage: TokenStorageService,
    private readonly _transactionService: TransactionsService,
    private readonly _cryptocurrencyService: CryptocurrencyService
  ) {}

  isLoading = true;
  cryptoFetchError: HttpErrorResponse;

  cryptocurrencies$: Cryptocurrency[];

  ngOnInit(): void {
    this._cryptocurrencyService
      .getAllCryptocurrencies()
      .pipe(
        tap((value) => {
          this.cryptocurrencies$ = value;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error) => {
          this.cryptoFetchError = error;
          return of(error);
        })
      )
      .subscribe();
  }

  buy(coin: Cryptocurrency): void {
    this._nbDialogService
      .open(CoinTransactionModalComponent, { context: { cryptocurrency: coin, title: 'Purchase: ' + coin.name } })
      .onClose.pipe(
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
    this._transactionService
      .saveTransaction(
        { cryptocurrency: coin.id, amount: 200, price: 60, type: TransactionType.SELL },
        this._tokenStorage.getId()
      )
      .subscribe(console.log);
  }
}
