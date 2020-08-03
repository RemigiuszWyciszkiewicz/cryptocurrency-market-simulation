import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const PIPES = [];
@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
  imports: [CommonModule],
  providers: [...PIPES],
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
