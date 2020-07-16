import { Injectable } from '@angular/core';

import { ApiService, ApiUrlConfiguration } from '../api';
import { User } from '../models/user';
import { AuthorizationModule } from './authorization.module';

@Injectable({
  providedIn: AuthorizationModule,
})
export class AuthService extends ApiService<User, string> {
  protected getApiUrlConfiguration(): ApiUrlConfiguration {
    return { endpoint: 'login', route: 'user' };
  }
}
