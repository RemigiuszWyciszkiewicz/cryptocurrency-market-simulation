import { AbstractControl, ValidatorFn } from '@angular/forms';

export function naturalNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value === '' || control.value === null) {
      return null;
    }

    const result = new RegExp('^[1-9][0-9]*$').test(control.value);
    return result ? null : { naturalNumber: control.value };
  };
}
