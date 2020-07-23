import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RankingModule as RankingModuleDataAccess } from '@coin-market/data-access/ranking';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [RankingComponent],
  imports: [CommonModule, RankingRoutingModule, RankingModuleDataAccess],
})
export class RankingModule {}
