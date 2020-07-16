import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormBuilder } from '@coin-market/ui/forms';

@Component({
  selector: 'coin-market-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private userFormBuilder: UserFormBuilder) {}

  userFormGroup: FormGroup;

  ngOnInit(): void {
    this.userFormGroup = this.userFormBuilder.createLoginForm().getForm();
  }

  signIn(): void {}
}
