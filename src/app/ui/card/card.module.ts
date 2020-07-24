import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';

import { CardBodyComponent } from './card-body/card-body.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardComponent } from './card/card.component';

const COMPONENTS = [CardComponent, CardHeaderComponent, CardBodyComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, NbCardModule, NbSpinnerModule],
})
export class CardModule {}
