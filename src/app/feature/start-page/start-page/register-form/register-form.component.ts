import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'coin-market-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnDestroy {
  @Output() registerFormSubmit = new EventEmitter();
  @Output() showLoginForm = new EventEmitter();
  @Input() formGroup: FormGroup;

  createUser(): void {
    if (this.formGroup.valid) {
      this.registerFormSubmit.next(this.formGroup.value);
    }
  }

  ngOnDestroy(): void {
    this.formGroup.reset();
  }
}
