import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cryptocurrency } from '../models';
import { CryptocurrenciesState, CryptocurrenciesStore } from './cryptocurrencies.store';

@Injectable({ providedIn: 'root' })
export class CryptocurrenciesQuery extends QueryEntity<CryptocurrenciesState> {
  constructor(protected store: CryptocurrenciesStore) {
    super(store);
  }

  getCryptocurrenciesIconsMap(): Observable<{ name: string; icon: string }[]> {
    return this.selectAll().pipe(
      map((values: Cryptocurrency[]) => values.map((value: Cryptocurrency) => ({ name: value.name, icon: value.image })))
    );
  }
}
