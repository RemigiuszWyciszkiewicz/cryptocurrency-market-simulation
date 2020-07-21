import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { Cryptocurrency } from '../models/cryptocurrency';

@Injectable()
export class CryptocurrencyService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'cryptocurrencies');
  }

  getCryptocurrenciesList(): Observable<Cryptocurrency[]> {
    return this.getAll<Cryptocurrency>('list');
  }
}
