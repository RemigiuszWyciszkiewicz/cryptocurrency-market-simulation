import { Injectable, Injector } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { Ranking, UserRankingInformaton } from '../models';

@Injectable()
export class RankingService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'ranking');
  }

  getRanking(): Observable<Ranking[]> {
    return this.getAll<Ranking>('list');
  }

  getUserRankingInformation(userId: ID): Observable<UserRankingInformaton> {
    return this.get<UserRankingInformaton>(userId);
  }
}
