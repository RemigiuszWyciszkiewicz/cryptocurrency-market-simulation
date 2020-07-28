import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetsModule } from '@coin-market/data-access/assets';
import { ChartsModule as ChartsModuleDataAccess } from '@coin-market/data-access/charts';
import { CryptocurrencyModule } from '@coin-market/data-access/cryptocurrency';
import { TransactionsModule as TransactionsModuleDataAccess } from '@coin-market/data-access/transactions';
import { CardModule } from '@coin-market/ui/card';
import { ChartsModule } from '@coin-market/ui/charts';
import { LoaderModule } from '@coin-market/ui/loader';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AssetItemComponent } from './dashboard/asset-item/asset-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioSummaryComponent } from './dashboard/portfolio-summary/portfolio-summary.component';
import { TransactionsListWidgetComponent } from './dashboard/transactions-list-widget/transactions-list-widget.component';
import { UserRankWidgetComponent } from './dashboard/user-rank-widget/user-rank-widget.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserRankWidgetComponent,
    TransactionsListWidgetComponent,
    PortfolioSummaryComponent,
    AssetItemComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    CryptocurrencyModule,
    AssetsModule,
    ChartsModuleDataAccess,
    TransactionsModuleDataAccess,
    LoaderModule,
    CardModule,
  ],
})
export class DashboardModule {}
