import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { CryptocurrencyDetails, News } from '../models';
import { Cryptocurrency } from '../models/cryptocurrency';

@Injectable()
export class CryptocurrencyService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'cryptocurrencies');
  }

  getCryptocurrenciesList(): Observable<Cryptocurrency[]> {
    return this.getAll<Cryptocurrency>('list');
  }

  getCryptocurrencyDetails(id: ID): Observable<CryptocurrencyDetails> {
    return this.get<CryptocurrencyDetails>(id, 'details');
  }

  getCryptocurrencyNews(id: ID, limit: number): Observable<News[]> {
    const params = new HttpParams().set('limit', String(limit));
    return this.getAll<News>('news/' + id, params);
  }

  getCryptocurrencyIcons(): Observable<{ name: string; icon: string }[]> {
    return this.getAll<{ name: string; icon: string }>('icons');
  }
}
