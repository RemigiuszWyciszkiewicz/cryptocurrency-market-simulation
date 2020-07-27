import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, TokenStorageService } from '@coin-market/core/authorization';
import { ErrorResponses } from '@coin-market/data-access/api';
import {
  CryptocurrenciesQuery,
  CryptocurrenciesStore,
  CryptocurrencyService
} from '@coin-market/data-access/cryptocurrency';
import { LoginResponse, User } from '@coin-market/data-access/models';
import { UserStore } from '@coin-market/data-access/user';
import { UserFormBuilder } from '@coin-market/ui/forms';
import { ToastrService } from '@coin-market/ui/toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _toastr: ToastrService,
    private readonly _authService: AuthService,
    private readonly _userStore: UserStore,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _userFormBuilder: UserFormBuilder,
    private readonly _cryptocurrenciesService: CryptocurrencyService,
    private readonly _cryptocurrenciesStore: CryptocurrenciesStore,
    private readonly _cryptocurrenciesQuery: CryptocurrenciesQuery,
    private readonly _tokenStorageService: TokenStorageService
  ) {}

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  isLoginFormVisible = true;

  cryptocurrenciesIconsMap$: Observable<{ name: string; icon: string }[]>;

  ngOnInit(): void {
    this.createFormGroups();
    this.cryptocurrenciesIconsMap$ = this._cryptocurrenciesService.getCryptocurrencyIcons().pipe(tap(console.log));
  }

  changeForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }

  signIn(user: User): void {
    this._authService.signIn(user).subscribe(
      (response: LoginResponse) => {
        this.handleSuccesfulLogin(response);
      },
      () => {
        this.loginFormGroup.reset();
        this._toastr.error('Bad creditials, try again.');
      }
    );
  }

  createAccount(user: User): void {
    this._authService.signUp(user).subscribe(
      () => {
        this.isLoginFormVisible = true;
        this._toastr.success('Account created');
      },
      (error: HttpErrorResponse) => {
        switch (error.error.type) {
          case ErrorResponses.EMAIL_DUPLICATION: {
            this.registerFormGroup.reset();
            this._toastr.error('Given email already exists');
            break;
          }
          case ErrorResponses.NAME_DUPLICATION: {
            this.registerFormGroup.reset();
            this._toastr.error('Given name already exists');
            break;
          }
          default: {
            this.registerFormGroup.reset();
            this._toastr.error('Server error');
            break;
          }
        }
      }
    );
  }

  createFormGroups(): void {
    this.loginFormGroup = this._userFormBuilder.createLoginForm().getForm();
    this.registerFormGroup = this._userFormBuilder.createRegisterForm().getForm();
  }

  handleSuccesfulLogin(response: LoginResponse): void {
    this._tokenStorageService.saveLoginResponse(response);
    this._authService.setUserAuthorizationStatus(true);
    this._router.navigate(['/pages'], { relativeTo: this._activatedRoute });
    this._toastr.success('Succesful login.');

    const user = response as User;
    this._userStore.update({ user });
  }
}
