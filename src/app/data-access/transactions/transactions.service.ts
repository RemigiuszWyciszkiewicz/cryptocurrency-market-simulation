import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { Transaction } from '../models';

@Injectable()
export class TransactionsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'transactions');
  }

  getAllTransactions(userId: string): Observable<Transaction[]> {
    return this.getAll<Transaction>(userId);
  }

  saveTransaction(transaction: Partial<Transaction>, userId: string): Observable<Transaction> {
    return this.post(transaction, userId);
  }
}
