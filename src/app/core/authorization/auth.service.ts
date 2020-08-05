import { Injectable, Injector } from '@angular/core';
import { ApiService } from '@coin-market/data-access/api';
import { Rechaptcha, User } from '@coin-market/data-access/models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends ApiService {
  private isAuthorized = false;

  constructor(injector: Injector) {
    super(injector, 'authorization');
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

  checkRechaptchaTokenValidity(token: string): Observable<Rechaptcha> {
    return this.post<Rechaptcha>({ token }, 'recaptchaTokenValidation');
  }
}
