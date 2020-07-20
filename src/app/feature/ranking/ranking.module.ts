import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [RankingComponent],
  imports: [CommonModule, RankingRoutingModule],
})
export class RankingModule {}
