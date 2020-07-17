import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  signIn<User>(user: User): Observable<User> {
    return this.post(user, 'signin');
  }

  signUp<User>(user: User): Observable<User> {
    return this.post(user, 'signup');
  }

  constructor(injector: Injector) {
    super(injector, 'user');
  }
}
