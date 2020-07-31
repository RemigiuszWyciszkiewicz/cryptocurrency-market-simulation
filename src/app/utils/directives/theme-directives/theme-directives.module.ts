import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PercentageChangeThemeDirective } from './percentage-change-theme.directive';

const DIRECTIVES = [PercentageChangeThemeDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  imports: [CommonModule],
})
export class ThemeDirectivesModule {}
