import { Component, OnInit } from '@angular/core';
import { UserFormBuilder } from 'src/app/ui/forms';
import { FormGroup } from '@angular/forms';
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
}
