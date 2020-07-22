import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { Transaction } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { UserQuery } from '@coin-market/data-access/user';
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
    private readonly _tokenStorageService: TokenStorageService,
    private readonly _userQuery: UserQuery
  ) {}

  ngOnInit(): void {
    this._transactionService
      .getTransactions(this._userQuery.getId(), 15)
      .pipe(
        tap((value: Transaction[]) => {
          this.transaction = value;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          this.getTransactionsError = error;
          return of(error);
        })
      )
      .subscribe();
  }
}
