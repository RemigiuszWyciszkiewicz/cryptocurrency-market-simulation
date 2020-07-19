import { Injectable, Injector } from '@angular/core';
import { ApiService } from '@coin-market/data-access/api';
import { User } from '@coin-market/data-access/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  checkTokenValidity(): Observable<any> {
    return this.post<any>({ test: 'wfafafa' }, 'tokenValidation').pipe(tap(console.log));
  }
}
