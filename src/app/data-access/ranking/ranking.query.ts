import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { RankingState, RankingStore } from './ranking.store';

@Injectable({ providedIn: 'root' })
export class RankingQuery extends QueryEntity<RankingState> {
  constructor(protected store: RankingStore) {
    super(store);
  }
}
