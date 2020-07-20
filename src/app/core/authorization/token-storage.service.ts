import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '@coin-market/data-access/models';
import { ToastrService } from '@coin-market/ui/toastr';

const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'userId';

@Injectable()
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor(private readonly _toastr: ToastrService, private readonly _router: Router) {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveEmail(email: string): void {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }

  saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority) => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  saveId(id: string): void {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id + '');
  }

  getId(): string {
    if (!sessionStorage.getItem(ID_KEY)) {
      this._toastr.error('Your identifier is not avaiable, please sign in again.');
      this._router.navigate(['./hello']);
      return;
    } else {
      return sessionStorage.getItem(ID_KEY);
    }
  }

  saveLoginResponse(loginResponse: LoginResponse): void {
    this.saveEmail(loginResponse.email);
    this.saveId(loginResponse._id);
    this.saveToken(loginResponse.token);
  }
}
