import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { TransactionType } from '@coin-market/data-access/models';
import { Cryptocurrency } from '@coin-market/data-access/models/cryptocurrency';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  constructor(
    private readonly _cryptocurrencyService: CryptocurrencyService,
    private readonly _transactionService: TransactionsService,
    private readonly _tokenStorage: TokenStorageService
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

  buy(coinId: string): void {
    this._transactionService
      .saveTransaction({ cryptocurrency: coinId, amount: 200, price: 60, type: TransactionType.BUY }, this._tokenStorage.getId())
      .subscribe();
  }

  sell(coinId: string): void {
    this._transactionService
      .saveTransaction({ cryptocurrency: coinId, amount: 200, price: 60, type: TransactionType.SELL }, this._tokenStorage.getId())
      .subscribe(console.log);
  }
}
