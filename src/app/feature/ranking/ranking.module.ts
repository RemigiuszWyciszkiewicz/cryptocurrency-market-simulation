import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RankingModule as RankingModuleDataAccess } from '@coin-market/data-access/ranking';
import { CardModule } from '@coin-market/ui/card';
import { LoaderModule } from '@coin-market/ui/loader';
import { ThemeDirectivesModule } from '@coin-market/utils/directives';
import { NbUserModule } from '@nebular/theme';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingCardComponent } from './ranking/ranking-card/ranking-card.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [RankingComponent, RankingCardComponent],
  imports: [
    CommonModule,
    RankingRoutingModule,
    RankingModuleDataAccess,
    CardModule,
    LoaderModule,
    NbUserModule,
    ThemeDirectivesModule,
  ],
})
export class RankingModule {}
