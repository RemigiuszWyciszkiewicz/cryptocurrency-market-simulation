import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { CoinTransactionModalComponent } from '@coin-market/ui/modal';
import { ToastrService } from '@coin-market/ui/toastr';
import { ID } from '@datorama/akita';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { ApiService } from '../api/api-service';
import { Asset, Cryptocurrency, Transaction, TransactionType } from '../models';
import { UserQuery, UserStore } from '../user';
import { TransactionsQuery } from './transactions.query';
import { TransactionStore } from './transactions.store';

@Injectable()
export class TransactionsService extends ApiService {
  constructor(
    injector: Injector,
    private readonly _userStore: UserStore,
    private readonly _userQuery: UserQuery,
    private readonly _toastrService: ToastrService,
    private readonly _dialogService: NbDialogService,
    private readonly _transactionsQuery: TransactionsQuery,
    private readonly _transactionStore: TransactionStore
  ) {
    super(injector, 'transactions');
  }

  getTransactions(userId: ID, limit: number): Observable<Transaction[]> {
    const params = new HttpParams().set('limit', String(limit));

    return this.getAll<Transaction>(String(userId), params);
  }

  saveTransaction(transaction: Partial<Transaction>, userId: ID): Observable<Transaction> {
    return this.post(transaction, String(userId));
  }

  buy(coin: Cryptocurrency, asset: Asset): void {
    this._dialogService
      .open(CoinTransactionModalComponent, {
        context: { cryptocurrency: coin, transactionType: TransactionType.PURCHASE, usdLimit: this._userQuery.getUSD() },
      })
      .onClose.pipe(
        filter(Boolean),
        switchMap((value) => {
          return this.saveTransaction(value, this._userQuery.getId());
        })
      )
      .subscribe(
        (transaction: Transaction) => {
          this._toastrService.success('Transaction completed');
          this._userStore.update((state) => ({ user: { ...state.user, usd: state.user.usd - transaction.value } }));
          this._transactionsQuery.hasEntity() ? this._transactionStore.add(transaction) : null;
          asset.quantity += transaction.quantity;
        },
        (error: HttpErrorResponse) => {
          this._toastrService.error('ERROR: ' + error.error.message);
        }
      );
  }

  sell(coin: Cryptocurrency, asset: Asset): void {
    this._dialogService
      .open(CoinTransactionModalComponent, {
        context: { cryptocurrency: coin, transactionType: TransactionType.SALE, quantityLimit: asset.quantity },
      })
      .onClose.pipe(
        filter(Boolean),
        switchMap((value) => {
          return this.saveTransaction(value, this._userQuery.getId());
        })
      )
      .subscribe(
        (transaction: Transaction) => {
          this._toastrService.success('Transaction completed');
          this._userStore.update((state) => ({ user: { ...state.user, usd: state.user.usd + transaction.value } }));
          asset.quantity -= transaction.quantity;
        },
        (error: HttpErrorResponse) => {
          this._toastrService.error('ERROR: ' + error.error.message);
        }
      );
  }
}
