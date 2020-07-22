import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { User } from '../models';

export interface ProfileState {
  profile: User | null;
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
export class ProfileStore extends Store<ProfileState> {
  constructor() {
    super({
      profile: null,
    });
  }

  updateProfile(profile: Partial<User>): void {
    this.update((currentState) => ({
      ...currentState,
      profile: { ...currentState.profile, profile },
    }));
  }
}
