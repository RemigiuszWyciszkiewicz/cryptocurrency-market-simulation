import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [NotFoundPageComponent, ErrorComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, RouterModule],
})
export class ErrorComponentsModule {}
