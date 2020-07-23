import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbActionsModule, NbTooltipModule } from '@nebular/theme';

import { ActionComponent } from './action/action.component';
import { ActionsComponent } from './actions/actions.component';

const COMPONENTS = [ActionsComponent, ActionComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, NbActionsModule, NbTooltipModule],
})
export class ActionsModule {}
