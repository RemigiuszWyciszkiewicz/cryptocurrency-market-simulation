import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { Transaction } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnInit {
  transaction: Transaction[];
  isLoading = true;
  getTransactionsError: HttpErrorResponse;

  constructor(
    private readonly _transactionService: TransactionsService,
    private readonly _tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this._transactionService
      .getAllTransactions(this._tokenStorageService.getId())
      .pipe(
        tap((value) => {
          this.transaction = value;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error) => {
          this.getTransactionsError = error;
          return of(error);
        })
      )
      .subscribe();
  }
}
