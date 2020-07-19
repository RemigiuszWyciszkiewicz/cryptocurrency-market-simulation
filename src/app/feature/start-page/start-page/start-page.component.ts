import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, TokenStorageService } from '@coin-market/core/authorization';
import { ErrorResponses } from '@coin-market/data-access/api';
import { LoginResponse, User } from '@coin-market/data-access/models';
import { UserFormBuilder } from '@coin-market/ui/forms';
import { ToastrService } from '@coin-market/ui/toastr';

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
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _userFormBuilder: UserFormBuilder,
    private readonly _tokenStorageService: TokenStorageService
  ) {}

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  isLoginFormVisible = true;

  ngOnInit(): void {
    this.createFormGroups();
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
        if (error.error === ErrorResponses.EMAIL_DUPLICATION) {
          this.registerFormGroup.reset();
          this._toastr.error('This email already exists');
        } else {
          this.registerFormGroup.reset();
          this._toastr.error('Server error');
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
  }
}
