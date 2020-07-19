import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _tokenStorageService: TokenStorageService
  ) {}
  canActivateChild(): Observable<boolean> {
    console.log('auth guard');
    if (this._authService.getUserAuthorizationStatus() && this._tokenStorageService.getToken()) {
      return of(true);
    }

    if (this._tokenStorageService.getToken()) {
      return this._authService.checkTokenValidity().pipe(
        map((response) => {
          if (response.isJwtValid) {
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
