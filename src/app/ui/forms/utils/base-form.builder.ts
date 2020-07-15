import { FormBuilder, FormGroup } from '@angular/forms';

export interface FormBuilderInterface {
  getForm(): FormGroup;
}

export abstract class BaseFormBuilder implements FormBuilderInterface {
  constructor(protected _formBuilder: FormBuilder) {}

  protected _form: FormGroup;

  getForm(): FormGroup {
    return this._form;
  }
}
