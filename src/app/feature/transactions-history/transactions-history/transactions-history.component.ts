import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '@coin-market/data-access/models';
import { TransactionsQuery, TransactionsService, TransactionStore } from '@coin-market/data-access/transactions';
import { UserQuery } from '@coin-market/data-access/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnInit {
  transactions$: Observable<Transaction[]> = this._transactionQuery.selectAll();
  loading$: Observable<boolean>;

  getTransactionsError: HttpErrorResponse;

  constructor(
    private readonly _transactionService: TransactionsService,

    private readonly _userQuery: UserQuery,
    private readonly _transactionStore: TransactionStore,
    private readonly _transactionQuery: TransactionsQuery
  ) {}

  ngOnInit(): void {
    if (!this._transactionQuery.hasEntity()) {
      this.fetchTransactions();
    }
  }

  fetchTransactions(): void {
    this._transactionService
      .getTransactions(this._userQuery.getId(), 15)
      .pipe(
        tap((value: Transaction[]) => {
          this._transactionStore.set(value);
        }),

        catchError((error: HttpErrorResponse) => {
          this.getTransactionsError = error;
          return of(error);
        })
      )
      .subscribe();
  }
}
