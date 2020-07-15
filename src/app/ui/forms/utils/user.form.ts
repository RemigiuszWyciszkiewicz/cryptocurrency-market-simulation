import { Injectable } from '@angular/core';
import { BaseFormBuilder } from './base-form.builder';
import { FormBuilder, Validators } from '@angular/forms';
@Injectable()
export class UserFormBuilder extends BaseFormBuilder {
  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  createLoginForm(): BaseFormBuilder {
    this._form = this._formBuilder.group({ password: ['', Validators.required], email: ['', Validators.required] });
    return this;
  }

  createRegisterForm(): BaseFormBuilder {
    this._form = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
    });
    return this;
  }
}
