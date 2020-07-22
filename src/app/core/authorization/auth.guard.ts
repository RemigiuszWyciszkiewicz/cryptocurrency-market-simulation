import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { User } from '@coin-market/data-access/models';
import { UserStore } from '@coin-market/data-access/user';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private readonly _router: Router,
    private readonly _userStore: UserStore,
    private readonly _authService: AuthService,
    private readonly _tokenStorageService: TokenStorageService
  ) {}
  canActivateChild(): Observable<boolean> {
    if (this._authService.getUserAuthorizationStatus() && this._tokenStorageService.getToken()) {
      return of(true);
    }

    if (this._tokenStorageService.getToken()) {
      return this._authService.checkTokenValidity(this._tokenStorageService.getId()).pipe(
        map((response: User) => {
          if (response) {
            this._userStore.update({ user: response });
            this._authService.setUserAuthorizationStatus(true);
            return true;
          } else {
            this._router.navigate(['../hello']);
            return false;
          }
        })
      );
    }

    this._router.navigate(['../hello']);
    return of(false);
  }
}
