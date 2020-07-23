import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { Ranking } from '../models';

@Injectable()
export class RankingService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'ranking');
  }

  getRanking(): Observable<Ranking[]> {
    return this.getAll<Ranking>('list');
  }
}
