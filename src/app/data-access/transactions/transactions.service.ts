import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { Transaction } from '../models';

@Injectable()
export class TransactionsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'transactions');
  }

  getTransactions(userId: ID, limit: number): Observable<Transaction[]> {
    const params = new HttpParams().set('limit', String(limit));

    return this.getAll<Transaction>(String(userId), params);
  }

  saveTransaction(transaction: Partial<Transaction>, userId: ID): Observable<Transaction> {
    return this.post(transaction, String(userId));
  }
}
