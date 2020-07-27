import { FormGroup } from '@angular/forms';

export function passwordConfirmationValidator(password: string, passwordConfirmation: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const passwordConfirmationControl = formGroup.controls[passwordConfirmation];

    if (!(passwordControl.value && passwordConfirmationControl.value)) {
      return;
    }
    if (passwordControl.value === passwordConfirmationControl.value) {
      passwordConfirmationControl.setErrors(null);
    } else {
      passwordConfirmationControl.setErrors({ passwordConfirmation: 'Passwords are not equal' });
    }
  };
}
