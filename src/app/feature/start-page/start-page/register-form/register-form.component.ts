import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'coin-market-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @Output() registerFormSubmit = new EventEmitter();
  @Input() formGroup: FormGroup;

  createUser(): void {
    if (this.formGroup.valid) {
      this.registerFormSubmit.next(this.formGroup.value);
    }
  }
}
