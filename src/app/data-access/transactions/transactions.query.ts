import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { TransactionState, TransactionStore } from './transactions.store';

@Injectable({ providedIn: 'root' })
// @QueryConfig({ sortByOrder: Order.ASC })
export class TransactionsQuery extends QueryEntity<TransactionState> {
  constructor(protected store: TransactionStore) {
    super(store);
  }
}
