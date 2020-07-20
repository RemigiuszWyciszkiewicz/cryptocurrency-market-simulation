import { ContentChildren, Directive, Injector, Input, OnInit, QueryList } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';

import { CustomInputErrorsDirective } from './custom-input-errors.directive';

@Directive()
export class BaseControlValueAccessor<T> implements ControlValueAccessor, OnInit {
  @ContentChildren(CustomInputErrorsDirective) customErrors: QueryList<CustomInputErrorsDirective>;

  @Input() label: string;
  @Input() placeholder = '';
  @Input() disabled: boolean;
  @Input() showErrorStatement = true;

  value: T;

  get isRequired(): boolean {
    return this.hasRequiredField(this.control);
  }

  get isMarkedAsInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get errors(): ValidationErrors {
    return this.control.errors;
  }

  get control(): AbstractControl {
    return this._ngControl.control;
  }

  get isFilled(): boolean {
    return Boolean(this.value);
  }

  get labelExists(): boolean {
    return Boolean(this.label);
  }

  protected _ngControl: NgControl;
  protected _controlContainer: ControlContainer;

  constructor(private readonly _injector: Injector) {}

  onChange(_: T, event?: KeyboardEvent): void {}

  onTouched(): void {}

  ngOnInit(): void {
    this._ngControl = this._injector.get<NgControl>(NgControl);
    this._controlContainer = this._injector.get<ControlContainer>(ControlContainer);
    if (!this._controlContainer.control) {
      throw new Error('This control requires to be associated with FormGroup');
    }
  }

  writeValue(value: T): void {
    this.value = value;
  }

  isTouched(): boolean {
    return this.control.touched;
  }

  registerOnChange(fn: (value: T, event: KeyboardEvent) => void): void {
    this.onChange = (value: T, event: KeyboardEvent) => {
      this.value = value;
      fn(value, event);
    };
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.onDisabledStateChange(isDisabled);
  }

  protected onDisabledStateChange(isDisabled: boolean): void {}

  private hasRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      return validator && validator.required;
    }
    if (abstractControl['controls']) {
      for (const controlName in abstractControl['controls']) {
        if (abstractControl['controls'][controlName] && this.hasRequiredField(abstractControl['controls'][controlName])) {
          return true;
        }
      }
    }
    return false;
  };
}
