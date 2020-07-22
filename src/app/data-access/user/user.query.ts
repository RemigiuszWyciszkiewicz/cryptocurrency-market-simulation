import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { LoginResponse } from '../models';
import { UserState, UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store);
  }

  selectUser(): Observable<Partial<LoginResponse>> {
    return this.select('user');
  }
}
