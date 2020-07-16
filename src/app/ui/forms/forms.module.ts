import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlErrorMessageComponent } from './control-error-message/control-error-message.component';
import { InputComponent } from './input/input.component';

const EXPORTED_COMPONENTS = [InputComponent];
const COMPONENTS = [ControlErrorMessageComponent];

@NgModule({
  declarations: [...EXPORTED_COMPONENTS, ...COMPONENTS],
  exports: [...EXPORTED_COMPONENTS, AngularFormsModule, ReactiveFormsModule],
  imports: [CommonModule, AngularFormsModule, ReactiveFormsModule],
})
export class FormsModule {}
