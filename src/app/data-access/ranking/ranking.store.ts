import { Injectable } from '@angular/core';
import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Ranking } from '../models/ranking';

export interface RankingState extends EntityState<Ranking, ID> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ranking', idKey: '_id', resettable: true })
export class RankingStore extends EntityStore<RankingState> {
  constructor() {
    super({});
  }
}
