import { Injectable, Injector } from '@angular/core';
import { ApiService } from '@coin-market/data-access/api';
import { User } from '@coin-market/data-access/models';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends ApiService {
  private isAuthorized = false;

  constructor(injector: Injector) {
    super(injector, 'user');
  }

  setUserAuthorizationStatus(status: boolean): void {
    this.isAuthorized = status;
  }

  getUserAuthorizationStatus(): boolean {
    return this.isAuthorized;
  }

  signIn(user: User): Observable<User> {
    return this.post<User>(user, 'signin');
  }

  signUp(user: User): Observable<User> {
    return this.post<User>(user, 'signup');
  }

  checkTokenValidity(userId: ID): Observable<User> {
    return this.post<any>({ test: 'wfafafa' }, 'tokenValidation/' + userId);
  }
}
