import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetsModule } from '@coin-market/data-access/assets';
import { ChartsModule as ChartsModuleDataAccess } from '@coin-market/data-access/charts';
import { CryptocurrencyModule } from '@coin-market/data-access/cryptocurrency';
import { TransactionsModule as TransactionsModuleDataAccess } from '@coin-market/data-access/transactions';
import { ChartsModule } from '@coin-market/ui/charts';
import { LoaderModule } from '@coin-market/ui/loader';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsListWidgetComponent } from './dashboard/transactions-list-widget/transactions-list-widget.component';

@NgModule({
  declarations: [DashboardComponent, TransactionsListWidgetComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    CryptocurrencyModule,
    AssetsModule,
    ChartsModuleDataAccess,
    TransactionsModuleDataAccess,
    LoaderModule,
  ],
})
export class DashboardModule {}
