import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormBuilder } from '@coin-market/ui/forms';

@Component({
  selector: 'coin-market-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(private userFormBuilder: UserFormBuilder) {}

  userFormGroup: FormGroup;

  ngOnInit(): void {
    this.userFormGroup = this.userFormBuilder.createRegisterForm().getForm();
  }

  createUser(): void {}
}
