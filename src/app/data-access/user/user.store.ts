import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { User } from '../models';

export interface UserState {
  user: Partial<User> | null;
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'profile',
  cache: {
    ttl: 3600000,
  },
})
export class UserStore extends Store<UserState> {
  constructor() {
    super({
      user: null,
    });
  }

  updateUser(user: Partial<User>): void {
    this.update((currentState) => ({
      ...currentState,
      user: { ...currentState.user, user },
    }));
  }
}
