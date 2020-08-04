import { Injectable } from '@angular/core';
import { ID, Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { User } from '../models';
import { UserState, UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store);
  }

  selectUser(): Observable<Partial<User>> {
    return this.select('user');
  }

  selectUSD(): Observable<number> {
    return this.select((state) => state.user.usd);
  }

  getUSD(): number {
    return this.getValue().user.usd;
  }

  getUserRank(): number {
    return this.getValue().user.userRank;
  }

  getId(): ID {
    return this.getValue().user._id;
  }
}
