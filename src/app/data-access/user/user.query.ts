import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { User } from '../models';
import { ProfileState, ProfileStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class ProfileQuery extends Query<ProfileState> {
  constructor(protected store: ProfileStore) {
    super(store);
  }

  selectProfile(): Observable<Partial<User>> {
    return this.select('profile');
  }
}
