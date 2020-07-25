import { Injectable } from '@angular/core';
import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Transaction } from '../models/transaction';

export interface TransactionState extends EntityState<Transaction, ID> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ranking', idKey: '_id', resettable: true })
export class TransactionStore extends EntityStore<TransactionState> {
  constructor() {
    super({});
  }
}
