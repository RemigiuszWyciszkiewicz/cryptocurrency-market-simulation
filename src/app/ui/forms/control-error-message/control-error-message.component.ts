import { Component, Input, QueryList, TemplateRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { CustomInputErrorsDirective } from '../utils/custom-input-errors.directive';

@Component({
  selector: 'coin-market-control-error-message',
  templateUrl: './control-error-message.component.html',
})
export class ControlErrorMessageComponent {
  @Input() errors: ValidationErrors;
  @Input() customErrors: QueryList<CustomInputErrorsDirective>;

  standardErrorsOrder: string[] = ['required', 'email', 'minlength', 'maxlength', 'min', 'max'];

  getErrorName(): string {
    return this.standardErrorsOrder.find(this.hasError.bind(this)) || this.getFirstNonStandardErrorName();
  }

  hasError(name: string): boolean {
    return Boolean(this.errors && this.errors[name]);
  }

  useDefaultMessage(type: string): boolean {
    return !this.getCustomErrorDir(type);
  }

  getTemplate(type: string): TemplateRef<any> {
    const customErrorDir = this.getCustomErrorDir(type);
    return customErrorDir && customErrorDir.tmp;
  }

  private getCustomErrorDir(type: string): CustomInputErrorsDirective {
    return this.customErrors && this.customErrors.find((customError) => customError.type === type);
  }

  private getFirstNonStandardErrorName(): string | null {
    return this.errors && Object.keys(this.errors)[0];
  }
}
