import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { CryptocurrenciesState, CryptocurrenciesStore } from './cryptocurrencies.store';

@Injectable({ providedIn: 'root' })
export class CryptocurrenciesQuery extends QueryEntity<CryptocurrenciesState> {
  constructor(protected store: CryptocurrenciesStore) {
    super(store);
  }
}
