import { Injectable } from '@angular/core';
import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Cryptocurrency } from '../models/cryptocurrency';

export interface CryptocurrenciesState extends EntityState<Cryptocurrency, ID> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cryptocurrencies', idKey: 'id', resettable: true })
export class CryptocurrenciesStore extends EntityStore<CryptocurrenciesState> {
  constructor() {
    super({});
  }
}
