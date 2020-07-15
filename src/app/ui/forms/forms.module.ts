import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
const COMPONENTS = [InputComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, AngularFormsModule, ReactiveFormsModule],
  imports: [CommonModule, AngularFormsModule, ReactiveFormsModule],
})
export class FormsModule {}
