import { Injectable, Injector } from '@angular/core';

import { ApiService, ApiUrlConfiguration } from '../api';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService<User, string> {
  protected getApiUrlConfiguration(): ApiUrlConfiguration {
    return { endpoint: 'signin', route: 'user' };
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
