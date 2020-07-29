import { Injectable } from '@angular/core';
import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Transaction } from '../models/transaction';

export interface TransactionState extends EntityState<Transaction, ID> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'transactions', idKey: '_id', resettable: true })
export class TransactionStore extends EntityStore<TransactionState> {
  constructor() {
    super({});
  }

  insertTransaction(transaction: Transaction): void {
    this.update((state) => {
      return { ids: [transaction._id, ...state.ids], entities: { [transaction._id]: transaction, ...state.entities } };
    });
  }
}
