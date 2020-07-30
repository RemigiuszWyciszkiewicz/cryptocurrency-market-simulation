import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, TokenStorageService } from '@coin-market/core/authorization';
import { ErrorResponses } from '@coin-market/data-access/api';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { LoginResponse, User } from '@coin-market/data-access/models';
import { UserStore } from '@coin-market/data-access/user';
import { UserFormBuilder } from '@coin-market/ui/forms';
import { ToastrService } from '@coin-market/ui/toastr';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
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
    private readonly _userStore: UserStore,
    private readonly _authService: AuthService,
    private readonly _toastrService: ToastrService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _userFormBuilder: UserFormBuilder,
    private readonly _tokenStorageService: TokenStorageService,
    private readonly _cryptocurrenciesService: CryptocurrencyService,
    @Inject(RECAPTCHA_SETTINGS) private readonly _recaptchaSettings: RecaptchaSettings
  ) {}

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  recaptchaFormGroup: FormGroup;
  isLoginFormVisible = true;
  isRecaptchaTokenValid = false;
  showRecaptchaErrorMessage = false;
  siteKey: string;

  cryptocurrenciesIconsMap$: Observable<{ name: string; icon: string }[]>;

  ngOnInit(): void {
    this.createFormGroups();
    this.siteKey = this._recaptchaSettings.siteKey;
    this.cryptocurrenciesIconsMap$ = this._cryptocurrenciesService.getCryptocurrencyIcons().pipe(tap(console.log));
  }

  changeForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }

  onSignIn(user: User): void {
    if (this.isRecaptchaTokenValid) {
      this.signInExecution(user);
    } else {
      this.showRecaptchaErrorMessage = true;
    }
  }

  signInExecution(user: User): void {
    this._authService.signIn(user).subscribe(
      (response: LoginResponse) => {
        this.handleSuccesfulLogin(response);
      },
      () => {
        this.loginFormGroup.reset();
        this._toastrService.error('Bad creditials, try again.');
      }
    );
  }

  onSignUp(user: User): void {
    if (this.isRecaptchaTokenValid) {
      this.signUpExecution(user);
    } else {
      this.showRecaptchaErrorMessage = true;
    }
  }

  signUpExecution(user: User): void {
    this._authService.signUp(user).subscribe(
      () => {
        this.isLoginFormVisible = true;
        this._toastrService.success('Account created');
      },
      (error: HttpErrorResponse) => {
        switch (error.error.type) {
          case ErrorResponses.EMAIL_DUPLICATION: {
            this.registerFormGroup.reset();
            this._toastrService.error('Given email already exists');
            break;
          }
          case ErrorResponses.NAME_DUPLICATION: {
            this.registerFormGroup.reset();
            this._toastrService.error('Given name already exists');
            break;
          }
          default: {
            this.registerFormGroup.reset();
            this._toastrService.error('Server error');
            break;
          }
        }
      }
    );
  }

  createFormGroups(): void {
    this.loginFormGroup = this._userFormBuilder.createLoginForm().getForm();
    this.registerFormGroup = this._userFormBuilder.createRegisterForm().getForm();
    this.recaptchaFormGroup = this._userFormBuilder.createRecaptchaFormGroup().getForm();
  }

  handleSuccesfulLogin(response: LoginResponse): void {
    this._tokenStorageService.saveLoginResponse(response);
    this._authService.setUserAuthorizationStatus(true);
    this._router.navigate(['/pages'], { relativeTo: this._activatedRoute });
    this._toastrService.success('Succesful login.');

    const user = response as User;
    this._userStore.update({ user });
  }

  recaptchaResolve(event: Event): void {
    this._authService
      .checkRechaptchaTokenValidity(String(event))
      .pipe(tap((value) => (this.isRecaptchaTokenValid = value.success)))
      .subscribe();
  }
}
