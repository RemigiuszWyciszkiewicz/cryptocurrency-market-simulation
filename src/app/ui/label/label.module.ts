import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbTooltipModule } from '@nebular/theme';

import { BootstrapBadgeComponent } from './bootstrap-badge/bootstrap-badge.component';

const COMPONENTS = [BootstrapBadgeComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, NbTooltipModule, RouterModule],
})
export class LabelModule {}
