import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'coin-market-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() loginFormSubmit = new EventEmitter();
  @Input() formGroup: FormGroup;

  signIn(): void {
    if (this.formGroup.valid) {
      this.loginFormSubmit.next(this.formGroup.value);
    }
  }
}
